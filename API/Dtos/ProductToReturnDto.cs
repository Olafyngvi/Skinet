using System.Collections.Generic;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool Izdvojen { get; set; }
        public string Sifra { get; set; }
        public decimal OldPrice { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public int Stock { get; set; }
        public IEnumerable<PhotoToReturnDto> Photos { get; set; }
    }
}