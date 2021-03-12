namespace API.Dtos
{
    public class ProizvodiToReturnDto
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Opis { get; set; }
        public decimal Price { get; set; }
        public string SlikaUrl { get; set; }
        public string ProizvodTip { get; set; }
        public string ProizvodMarka { get; set; }
    }
}