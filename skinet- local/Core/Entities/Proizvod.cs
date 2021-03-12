namespace Core.Entities
{
    public class Proizvod : BaseEntity
    {
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public decimal Price { get; set; }
        public string SlikaUrl { get; set; }
        public ProizvodTip ProizvodTip { get; set; }
        public int ProizvodTipId { get; set; }
        public ProizvodMarka ProizvodMarka { get; set; }
        public int ProizvodMarkaId { get; set; }
    }
}