using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [DebuggerDisplay("{" + nameof(GetDebuggerDisplay) + "(),nq}")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUsersRepository _usersRepository;
        private readonly JwtHandler _jwtHandler;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper, IUsersRepository usersRepository, JwtHandler jwtHandler)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Pagination<AllUsersDto>>> GetUsers(
            [FromQuery] UsersSpecParams usersParams
        )
        {
            var spec = new UsersWithAddressSpecification(usersParams);
            var countSpec = new UsersWithFiltersForCountSpecification(usersParams);

            var totalItems = await _usersRepository.CountAsync(countSpec);

            var users = await _usersRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<AllUsersDto>>(users);

            return Ok(new Pagination<AllUsersDto>(usersParams.PageIndex,
                    usersParams.PageSize, totalItems, data));
            /*
            List<AllUsersDto> usersReturn = new List<AllUsersDto>();
            return await Task.Run(() => {
                foreach(var user in _userManager.Users.Include(x => x.Address))
                {
                    var temp  = new AllUsersDto
                    {
                        DisplayName = user.DisplayName,
                        Email = user.Email,
                        FirstName = user.Address?.FirstName,
                        LastName = user.Address?.LastName,
                        Address = user.Address?.Street + " " + user.Address?.City

                    };
                    usersReturn.Add(temp);
                }
                return usersReturn;
            });
            */
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);

            return _mapper.Map<AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);

            user.Address = _mapper.Map<Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [HttpPost("ExternalLogin")]
        public async Task<ActionResult<UserDto>> ExternalLogin(ExternalAuthDto externalAuth)
        {
            var payload = await _jwtHandler.VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new AppUser { Email = payload.Email, UserName = payload.Email, DisplayName = payload.Name };
                    await _userManager.CreateAsync(user);
                    //prepare and send an email for the email confirmation
                    await _userManager.AddToRoleAsync(user, "Member");
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                {
                    await _userManager.AddLoginAsync(user, info);
                }
            }
            if (user == null)
                return BadRequest("Invalid External Authentication.");
            //check for the Locked out account
            var token = await _jwtHandler.GenerateToken(user);
            // return Ok(new AuthResponseDto { Token = token, IsAuthSuccessful = true });
            return Ok(new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            var roleAddResult = await _userManager.AddToRoleAsync(user, "Member");

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Token = await _tokenService.CreateToken(user),
            Email = user.Email
        };
        }
    }
}


