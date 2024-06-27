using MisaAsp.Models.ViewModel;
using MisaAsp.Repositories;

namespace MisaAsp.Services
{
    public interface IBankAccountService
    {
       // Task<IEnumerable<BankAccount>> GetAllBankAccountAsync();
        Task<int> CreateBankAccountAsync(CreateBankAccount request);

    }
    public class BankAccountService : IBankAccountService
    {
        private readonly IConfiguration _configuration;
        private readonly IBankAccountService _bankaccountRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BankAccountService(IBankAccountService bankaccountRepo, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _bankaccountRepo = bankaccountRepo;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> CreateBankAccountAsync(CreateBankAccount request)
        {
            return await _bankaccountRepo.CreateBankAccountAsync(request);
        }
    }
}

