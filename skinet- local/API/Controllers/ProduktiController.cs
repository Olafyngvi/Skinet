using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using AutoMapper;
using API.Dtos;
using API.Helpers;

namespace API.Controllers
{
     public class ProduktiController : BaseApiController
     {
          private readonly IGenericRepository<Proizvod> _proizvodiRepo;
          private readonly IGenericRepository<ProizvodMarka> _proizvodMarkeRepo;
          private readonly IGenericRepository<ProizvodTip> _proizvodTipRepo;
          private readonly IMapper _mapper;

          public ProduktiController(IGenericRepository<Proizvod> proizvodiRepo,
                                    IGenericRepository<ProizvodMarka> proizvodMarkeRepo,
                                    IGenericRepository<ProizvodTip> proizvodTipRepo,
                                    IMapper mapper)
          {
               _proizvodTipRepo = proizvodTipRepo;
               _proizvodMarkeRepo = proizvodMarkeRepo;
               _proizvodiRepo = proizvodiRepo;
               _mapper = mapper;

          }

          [Cached(600)]
          [HttpGet]
          public async Task<ActionResult<Pagination<ProizvodiToReturnDto>>> GetProducts([FromQuery] ProizvociSpecParams proizvodiParams)
          {
               var spec = new ProizvodiSaTipovimaIMarkamaSpecification(proizvodiParams);
               var countSpec = new ProizvodiSaFilteromZaCountSpecification(proizvodiParams);

               var totalItems = await _proizvodiRepo.CountAsync(countSpec);
               var products = await _proizvodiRepo.ListAsync(spec);
               var data = _mapper.Map<IReadOnlyList<Proizvod>, IReadOnlyList<ProizvodiToReturnDto>>(products);

               return Ok(new Pagination<ProizvodiToReturnDto>(proizvodiParams.PageSize, proizvodiParams.PageIndex, totalItems, data));
          }

          [Cached(600)]
          [HttpGet("{id}")]
          public async Task<ActionResult<ProizvodiToReturnDto>> GetProduct(int id)
          {
               var spec = new ProizvodiSaTipovimaIMarkamaSpecification(id);

               var product = await _proizvodiRepo.GetEntityWithSpec(spec);
               if (product != null)
                    return Ok(_mapper.Map<Proizvod, ProizvodiToReturnDto>(product));
               else
                    return NotFound();

          }

          [Cached(600)]
          [HttpGet("marke")]
          public async Task<ActionResult<IReadOnlyList<ProizvodMarka>>> GetProizvodiMarke()
          {
               return Ok(await _proizvodMarkeRepo.ListAllAsync());
          }

          [Cached(600)]
          [HttpGet("tip")]
          public async Task<ActionResult<IReadOnlyList<ProizvodTip>>> GetProizvodiTip()
          {
               return Ok(await _proizvodTipRepo.ListAllAsync());
          }
     }
}