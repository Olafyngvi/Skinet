using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(Entities.OrderAggregate.Contact contact);
        Task SendWelcomeEmailAsync(Entities.OrderAggregate.Contact contact);
        Task SendOrderMailAsync(int orderNumber,string items, decimal total, string address);
    }
}