﻿using MisaAsp.Models.BaseModel;
using MisaAsp.Models.ViewModel;
using System.Data;
using Dapper;
using System.Threading.Tasks;

namespace MisaAsp.Repositories
{
    public interface IAccountRepository : IBaseRepository
    {
        Task<bool> UpdateUserAsync(UpdateUser user);
        Task<bool> DeleteUserAsync(int userId);
        Task<IEnumerable<UserRequest>> GetAllUsersAsync();
        Task<int> RegisterUserAsync(RegistrationRequest request);
        Task<bool> IsEmailUniqueAsync(string email);
        Task<bool> IsPhoneUniqueAsync(string phoneNumber);
        Task<bool> AuthenticateUserAsync(LoginRequest request);
        Task<bool> ForgotPasswordAsync(ForgotPasswordRequest request);
        Task<RoleAccount> GetUserRoleAsync(string emailOrPhoneNumber);
    }

    public class AccountRepository : BaseRepository, IAccountRepository
    {
        public AccountRepository(IDbConnection connection) : base(connection) { }

        public async Task<bool> UpdateUserAsync(UpdateUser user)
        {
            var sql = "UPDATE Registrations SET FirstName = @FirstName, LastName = @LastName, Email = @Email, PhoneNumber = @PhoneNumber, RoleId = @RoleId WHERE FirstName = @FirstName";
            var result = await ExecuteAsync(sql, user);
            return result > 0;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var sql = "SELECT delete_user(@user_id)";
            var result = await ExecuteScalarAsync<bool>(sql, new { user_id = userId });
            return result;
        }

        public async Task<IEnumerable<UserRequest>> GetAllUsersAsync()
        {
            var sql = "SELECT * FROM GetAllUsers()";
            return await QueryAsync<UserRequest>(sql);
        }

        public async Task<int> RegisterUserAsync(RegistrationRequest request)
        {
            var parameters = new
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Password = request.Password,
                RoleId = request.RoleId,
            };
            return await ExecuteProcScalarAsync<int>("registeruser", parameters);
        }
    

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            var query = "SELECT COUNT(1) FROM Registrations WHERE Email = @Email";
            var count = await ExecuteScalarAsync<int>(query, new { Email = email });
            return count == 0;
        }

        public async Task<bool> IsPhoneUniqueAsync(string phoneNumber)
        {
            var query = "SELECT COUNT(1) FROM Registrations WHERE PhoneNumber = @PhoneNumber";
            var count = await ExecuteScalarAsync<int>(query, new { PhoneNumber = phoneNumber });
            return count == 0;
        }

        public async Task<bool> AuthenticateUserAsync(LoginRequest request)
        {
            var parameters = new
            {
                EmailOrPhoneNumber = request.EmailOrPhoneNumber,
                Password = request.Password,
            };
            return await ExecuteProcScalarAsync<bool>("authenticateuser", parameters);
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            var sql = "SELECT CheckEmailExists(@Email)";
            var parameters = new { request.Email };
            return await ExecuteScalarAsync<bool>(sql, parameters);
        }

        public async Task<RoleAccount> GetUserRoleAsync(string emailOrPhoneNumber)
        {
            var sql = @"
                SELECT ra.UserId, ra.RoleId, r.RoleName
                FROM RoleAccount ra
                JOIN Roles r ON ra.RoleId = r.Id
                JOIN Registrations u ON ra.UserId = u.Id
                WHERE u.Email = @EmailOrPhoneNumber OR u.PhoneNumber = @EmailOrPhoneNumber";
            return await QuerySingleOrDefaultAsync<RoleAccount>(sql, new { EmailOrPhoneNumber = emailOrPhoneNumber });
        }
    }
}
