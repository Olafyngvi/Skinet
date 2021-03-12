using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
     public class ProizvodConfig : IEntityTypeConfiguration<Proizvod>
     {
          public void Configure(EntityTypeBuilder<Proizvod> builder)
          {
               builder.Property(p => p.Id).IsRequired();
               builder.Property(p => p.Naziv).IsRequired().HasMaxLength(100);
               builder.Property(p => p.Opis).IsRequired();
               builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
               builder.Property(p => p.SlikaUrl).IsRequired();
               builder.HasOne(b => b.ProizvodMarka).WithMany().HasForeignKey(p => p.ProizvodMarkaId);
               builder.HasOne(b => b.ProizvodTip).WithMany().HasForeignKey(p => p.ProizvodTipId);
          }
     }
}