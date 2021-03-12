namespace Core.Entities
{
     public class BasketIdem
     {
          public int Id { get; set; }
          public string Naziv { get; set; }
          public decimal Price { get; set; }
          public int Quantity { get; set; }
          public string SlikaUrl { get; set; }
          public string Marka { get; set; }
          public string Tip { get; set; }
     }
}