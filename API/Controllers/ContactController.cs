using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        public ContactController()
        {
        }

        [HttpPost]
        public void GetMessage(Contact contact)
        {
            string adresa1 = "rijadda@gmail.com";


            var fromAddress = new MailAddress(adresa1, "Drinex Computers");
            var toAddress = new MailAddress("richie_dzr@hotmail.com", "Poštovani");
            const string fromPassword = "Greendevil123";
            const string subject = "UPIT";
            string body = "Poštovani, \n" + contact.Message + "\nLijep pozdrav";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            };

            smtp.Send(message);
        }
    }
}