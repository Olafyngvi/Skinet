using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ProizvodUrlResolver : IValueResolver<Proizvod, ProizvodiToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProizvodUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Proizvod source, ProizvodiToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.SlikaUrl))
            {
                return _config["ApiUrl"] + source.SlikaUrl;
            }
            return null;
        }
    }
}