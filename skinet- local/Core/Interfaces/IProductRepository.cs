using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Proizvod> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Proizvod>> GetProductsAsync();
        Task<IReadOnlyList<ProizvodMarka>> GetProizvodMarkeAsync();
        Task<IReadOnlyList<ProizvodTip>> GetProizvodTipAsync();
    }
}