using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
     public class BasketItemDto
     {
          [Required]
          public int Id { get; set; }
          [Required]
          public string Naziv { get; set; }
          [Required]
          [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
          public decimal Price { get; set; }
          [Required]
          [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]

          public int Quantity { get; set; }
          [Required]
          public string SlikaUrl { get; set; }
          [Required]
          public string Marka { get; set; }
          [Required]
          public string Tip { get; set; }
     }
}