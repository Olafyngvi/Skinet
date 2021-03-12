using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
     public class ProizvodiSaTipovimaIMarkamaSpecification : BaseSpecification<Proizvod>
     {
          public ProizvodiSaTipovimaIMarkamaSpecification(ProizvociSpecParams proizvodiParams)
              : base(x =>
                  (string.IsNullOrEmpty(proizvodiParams.Search) || x.Naziv.ToLower().Contains(proizvodiParams.Search)) &&
                  (!proizvodiParams.MarkaId.HasValue || x.ProizvodMarkaId == proizvodiParams.MarkaId) &&
                  (!proizvodiParams.TipId.HasValue || x.ProizvodTipId == proizvodiParams.TipId)
              )
          {
               AddInclude(x => x.ProizvodTip);
               AddInclude(x => x.ProizvodMarka);
               AddOrderBy(x => x.Naziv);
               ApplyPaging(proizvodiParams.PageSize * (proizvodiParams.PageIndex - 1), proizvodiParams.PageSize);
               if (!string.IsNullOrEmpty(proizvodiParams.Sort))
               {
                    switch (proizvodiParams.Sort)
                    {
                         case "priceAsc":
                              AddOrderBy(p => p.Price);
                              break;
                         case "priceDesc":
                              AddOrderByDescending(p => p.Price);
                              break;
                         default:
                              AddOrderBy(n => n.Naziv);
                              break;
                    }
               }
          }

          public ProizvodiSaTipovimaIMarkamaSpecification(int id) : base(x => x.Id == id)
          {
               AddInclude(x => x.ProizvodTip);
               AddInclude(x => x.ProizvodMarka);
          }
     }
}