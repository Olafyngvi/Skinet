using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
     public class MappingProfiles : Profile
     {
          public MappingProfiles()
          {
               CreateMap<Proizvod, ProizvodiToReturnDto>()
                    .ForMember(x => x.ProizvodMarka, o => o.MapFrom(s => s.ProizvodMarka.Naziv))
                    .ForMember(x => x.ProizvodTip, o => o.MapFrom(s => s.ProizvodTip.Naziv))
                    .ForMember(d => d.SlikaUrl, o => o.MapFrom<ProizvodUrlResolver>());

               //Identity Address
               CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
               CreateMap<CustomerBasketDto, CustomerBasket>();
               CreateMap<BasketItemDto, BasketIdem>();
               //OrderAggregate Address
               CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
               CreateMap<Order, OrderToReturnDto>()
                    .ForMember(x => x.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                    .ForMember(x => x.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
               CreateMap<OrderItem, OrderItemDto>()
                    .ForMember(x => x.ProductId, o => o.MapFrom(s => s.Id))
                    .ForMember(x => x.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                    .ForMember(x => x.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                    .ForMember(x => x.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
          }
     }
}