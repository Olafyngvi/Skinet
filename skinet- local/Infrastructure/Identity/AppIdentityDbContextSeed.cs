using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
     public class AppIdentityDbContextSeed
     {
          public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
          {
               if (!userManager.Users.Any())
               {
                    var user = new AppUser
                    {
                         DisplayName = "Rijad",
                         Email = "rijadda@gmail.com",
                         UserName = "rijadda@gmail.com",
                         Address = new Address
                         {
                              FirstName = "Rijad",
                              LastName = "Dzanko",
                              Street = "Ruzdije Islamagica 49",
                              City = "Gorazde",
                              ZipCode = "73000"
                         }
                    };
                    await userManager.CreateAsync(user, "Pa$$w0rd");
               }

          }
     }
}