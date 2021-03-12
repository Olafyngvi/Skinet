using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
     public class StoreContextSeed
     {
          public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
          {
               try
               {
                    if (!context.ProizvodMarke.Any())
                    {
                         var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                         var brands = JsonSerializer.Deserialize<List<ProizvodMarka>>(brandsData);
                         foreach (var item in brands)
                         {
                              context.ProizvodMarke.Add(item);
                         }
                         await context.SaveChangesAsync();
                    }
                    if (!context.ProizvodTipovi.Any())
                    {
                         var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                         var types = JsonSerializer.Deserialize<List<ProizvodTip>>(typesData);
                         foreach (var item in types)
                         {
                              context.ProizvodTipovi.Add(item);
                         }
                         await context.SaveChangesAsync();
                    }
                    if (!context.Proizvodi.Any())
                    {
                         var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                         var products = JsonSerializer.Deserialize<List<Proizvod>>(productsData);
                         foreach (var item in products)
                         {
                              context.Proizvodi.Add(item);
                         }
                         await context.SaveChangesAsync();
                    }
                    if (!context.DeliveryMethods.Any())
                    {
                         var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                         var dms = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                         foreach (var item in dms)
                         {
                              context.DeliveryMethods.Add(item);
                         }
                         await context.SaveChangesAsync();
                    }
               }
               catch (Exception ex)
               {
                    var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                    logger.LogError(ex.Message);
               }
          }
     }
}