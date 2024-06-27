﻿using MisaAsp.Models.BaseModel;
using MisaAsp.Models.ViewModel;
using System.Data;
using Dapper;
using System.Threading.Tasks;
using System.Data.Common;
namespace MisaAsp.Repositories
{
    public interface IBankAccountRepository : IBaseRepository
    {
        //Task<IEnumerable<BankAccount>> GetAllBankAccountAsync();
        Task<int> CreateBankAccountAsync(CreateBankAccount request);

    }
    public class BankAccountRepository : BaseRepository, IBankAccountRepository
    {
        public BankAccountRepository(IDbConnection connection) : base(connection) { }

        public async Task<int> CreateBankAccountAsync(CreateBankAccount request)
        {
            var parameters = new
            {
                AccountNumber = request.AccountNumber,
                BankName = request.BankName,
                Branch = request.Branch,                           
                RoleId = request.RoleId,
            };
            return await ExecuteProcScalarAsync<int>("createbankaccount", parameters);
        }

    }
}