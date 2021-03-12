using System.Collections.Generic;

namespace Core.Entities
{
     public class CustomerBasket
     {
          public CustomerBasket()
          {
          }

          public CustomerBasket(string id)
          {
               Id = id;
          }

          public string Id { get; set; }
          public List<BasketIdem> Items { get; set; } = new List<BasketIdem>();
          public int? DeliveryMethodId { get; set; }
          public string ClientSecret { get; set; }
          public string PaymentIntentId { get; set; }
          public decimal ShippingPrice { get; set; }
     }
}