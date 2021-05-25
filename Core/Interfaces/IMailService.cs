using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(Entities.OrderAggregate.Contact contact);
        Task SendWelcomeEmailAsync(Entities.OrderAggregate.Contact contact);
    }
}