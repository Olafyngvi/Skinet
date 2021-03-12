using Core.Entities;

namespace Core.Specifications
{
     public class ProizvodiSaFilteromZaCountSpecification : BaseSpecification<Proizvod>
     {
          public ProizvodiSaFilteromZaCountSpecification(ProizvociSpecParams proizvodiParams)
          : base(x =>
                  (string.IsNullOrEmpty(proizvodiParams.Search) || x.Naziv.ToLower().Contains(proizvodiParams.Search)) &&
                  (!proizvodiParams.MarkaId.HasValue || x.ProizvodMarkaId == proizvodiParams.MarkaId) &&
                  (!proizvodiParams.TipId.HasValue || x.ProizvodTipId == proizvodiParams.TipId)
              )
          {
          }
     }
}