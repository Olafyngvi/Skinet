using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Core.Interfaces;
using AutoMapper;
using API.Helpers;
using API.Middleware;
using API.Errors;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using Infrastructure.Identity;
using Core.Entities.Identity;
using API.Extensions;
using Infrastructure.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace API
{
     public class Startup
     {
          private readonly IConfiguration _configuration;
          public Startup(IConfiguration configuration)
          {
               _configuration = configuration;
          }


          // This method gets called by the runtime. Use this method to add services to the container.
          public void ConfigureServices(IServiceCollection services)
          {
               services.AddSingleton<IResponseCacheService, ResponseCacheService>();
               services.AddScoped<IPaymentService, PaymentService>();
               services.AddScoped<IUnitOfWork, UnitOfWork>();
               services.AddScoped<ITokenService, TokenService>();
               services.AddScoped<IOrderService, OrderService>();
               services.AddControllers().AddNewtonsoftJson();
               services.AddDbContext<StoreContext>(x => x.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));
               services.AddDbContext<AppIdentityDbContext>(x =>
               {
                    x.UseNpgsql(_configuration.GetConnectionString("IdentityConnection"));
               });
               services.AddIdentityServices(_configuration);
               services.AddSingleton<IConnectionMultiplexer>(c =>
               {
                    var configuration = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"), true);
                    return ConnectionMultiplexer.Connect(configuration);
               });
               services.AddScoped<IBasketRepository, BasketRepository>();
               services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
               services.AddScoped<IProductRepository, ProductRepository>();
               services.AddAutoMapper(typeof(MappingProfiles));
               services.AddControllers();
               services.Configure<ApiBehaviorOptions>(options =>
               {
                    options.InvalidModelStateResponseFactory = ActionContext =>
                 {
                      var errors = ActionContext.ModelState
                   .Where(e => e.Value.Errors.Count > 0)
                   .SelectMany(x => x.Value.Errors)
                   .Select(x => x.ErrorMessage).ToArray();

                      var errorResponse = new ApiValidationErrorResponse
                      {
                           Errors = errors
                      };
                      return new BadRequestObjectResult(errorResponse);
                 };
               });
               services.AddSwaggerGen(c =>
               {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SkiNet API", Version = "v1" });

                    var securitySchema = new OpenApiSecurityScheme
                    {
                         Description = "JWT Auth Bearer Scheme",
                         Name = "Authorization",
                         In = ParameterLocation.Header,
                         Type = SecuritySchemeType.Http,
                         Scheme = "bearer",
                         Reference = new OpenApiReference
                         {
                              Type = ReferenceType.SecurityScheme,
                              Id = "Bearer"
                         }
                    };

                    c.AddSecurityDefinition("Bearer", securitySchema);
                    var securityRequirement = new OpenApiSecurityRequirement { { securitySchema, new[] { "Bearer" } } };
                    c.AddSecurityRequirement(securityRequirement);
               });
               services.AddCors(opt =>
               {
                    opt.AddPolicy("CorsPolicy", policy =>
                    {
                         {
                              policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                              policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:5001");
                         }
                    });
               });
          }

          // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
          public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
          {
               app.UseMiddleware<ExceptionMiddleware>();
               app.UseStatusCodePagesWithReExecute("/errors/{0}");
               app.UseHttpsRedirection();
               app.UseRouting();
               app.UseStaticFiles();
               app.UseStaticFiles(new StaticFileOptions
               {
                    FileProvider = new PhysicalFileProvider(
                         Path.Combine(Directory.GetCurrentDirectory(), "Content")
                    ),
                    RequestPath = "/content"
               });
               app.UseCors("CorsPolicy");
               app.UseAuthentication();
               app.UseAuthorization();
               app.UseSwagger();
               app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1"); });
               app.UseEndpoints(endpoints =>
               {
                    endpoints.MapControllers();
                    endpoints.MapFallbackToController("Index", "Fallback");
               });
          }
     }
}
