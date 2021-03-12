using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Proizvod> GetProductByIdAsync(int id)
        {
            return await _context.Proizvodi
                .Include(x => x.ProizvodMarka)
                .Include(x => x.ProizvodTip)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Proizvod>> GetProductsAsync()
        {
            return await _context.Proizvodi
                .Include(x => x.ProizvodMarka)
                .Include(x => x.ProizvodTip)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<ProizvodMarka>> GetProizvodMarkeAsync()
        {
            return await _context.ProizvodMarke.ToListAsync();
        }

        public async Task<IReadOnlyList<ProizvodTip>> GetProizvodTipAsync()
        {
            return await _context.ProizvodTipovi.ToListAsync();
        }
    }
}