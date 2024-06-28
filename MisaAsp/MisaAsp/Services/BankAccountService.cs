using Microsoft.IdentityModel.Tokens;
using MisaAsp.Models.ViewModel;
using MisaAsp.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using MisaAsp.Models.BaseModel;
using Microsoft.AspNetCore.Http;

namespace MisaAsp.Services
{
    public interface IBankAccountService
    {
        Task<BankAccount> GetBankAccountByRoleAsync(int roleId);
        Task<int> CreateBankAccountAsync(CreateBankAccount request);

    }
    public class BankAccountService : IBankAccountService
    {
        private readonly IConfiguration _configuration;
        private readonly IBankAccountRepository _bankaccountRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BankAccountService(IBankAccountRepository bankaccountRepo, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _bankaccountRepo = bankaccountRepo;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> CreateBankAccountAsync(CreateBankAccount request)
        {
            return await _bankaccountRepo.CreateBankAccountAsync(request);
        }
        public async Task<BankAccount> GetBankAccountByRoleAsync(int roleId)
        {
            return await _bankaccountRepo.GetBankAccountByRoleAsync(roleId);
        }
    }
}

