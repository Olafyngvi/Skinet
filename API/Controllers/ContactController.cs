using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class ContactController : BaseApiController
    {
        private readonly string mailFrom;
        private readonly string mailFromPassword;
        private readonly string mailTo;
        public ContactController(IConfiguration config)
        {
            mailFrom = config.GetSection("Mail:mailFrom").Value;
            mailFromPassword = config.GetSection("Mail:fromPassword").Value;
            mailTo = config.GetSection("Mail:receiverMail").Value;
        }

        [HttpPost]
        public void GetMessage(Contact contact)
        {
            sendMail(mailFrom, mailFromPassword, mailTo, contact);
        }

        private void sendMail(string senderMail, string senderPassword, string receiverMail, Contact contact)
        {
            string adresa1 = senderMail;


            var fromAddress = new MailAddress(adresa1, "Drinex Computers");
            var toAddress = new MailAddress(receiverMail, "Poštovani");
            string fromPassword = senderPassword;
            const string subject = "UPIT";
            string body = contact.Mail
                          + "\n" + 
                          contact.Name +
                          "\n" +
                          contact.PhoneNumber +
                          "Poštovani, \n" + 
                          contact.Message
                           + "\nLijep pozdrav";

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