using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MisaAsp.Models.Ulti;
using MisaAsp.Models.ViewModel;
using MisaAsp.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MisaAsp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
        {
            var res = new ResOutput();

            try
            {
                if (!ModelState.IsValid)
                {
                    res.HandleError("Thất bại");
                }
                else
                {
                    var userId = await _accountService.RegisterUserAsync(request);

                    if (userId > 0)
                    {
                        res.HandleSuccess("Đăng kí thành công", new { UserId = userId });
                    }
                    else
                    {
                        res.HandleError("Đăng kí thất bại", new { UserId = userId });
                    }
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                res.HandleError(ex.Message);
                return BadRequest(res);
            }
        }
        /// <summary>
        /// Đăng nhập
        /// Create by vdlinh 06/11/2024
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var res = new ResOutput();

            try
            {
                if (!ModelState.IsValid)
                {
                    res.HandleError("Thất bại");
                }
                else
                {
                    var authResult = await _accountService.AuthenticateUserAsync(request, Response);
                    if (authResult != null && !string.IsNullOrEmpty(authResult.Token))
                    {
                        // Thêm lastName và userId vào phản hồi
                        var user = await _accountService.GetUserByIdAsync(authResult.UserId);

                        res.HandleSuccess("Đăng nhập thành công", new { Role = authResult.Role, Token = authResult.Token, LastName = user.LastName });
                    }
                    else
                    {
                        res.HandleError("Thông tin đăng nhập không hợp lệ");
                    }
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                res.HandleError(ex.Message);
                return BadRequest(res);
            }
        }






        /// <summary>
        /// Lấy tất cả user
        /// CreatedBy vdlinh 11.06.2024
        /// </summary>
        /// <returns></returns>
        [HttpGet("users")]
        [Authorize(Roles = "Admin")] // Chỉ admin mới có quyền truy cập
        public async Task<IActionResult> GetUsers()
        {
            var users = await _accountService.GetAllUsersAsync();
            var res = new ResOutput();

            if (users != null && users.Any())
            {
                res.HandleSuccess("Lấy thông tin người dùng thành công", users);
                return Ok(res);
            }
            else
            {
                res.HandleError("Lấy thông tin người dùng thất bại");
                return BadRequest(res);
            }
        }
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _accountService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("users/{id}")]
        [Authorize(Roles = "Admin,User")] // Chỉ admin và người dùng mới có quyền truy cập
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser user)
        {
            var res = new ResOutput();

            try
            {
                if (id != user.Id)
                {
                    res.HandleError("User ID không khớp");
                }
                else
                {
                    var result = await _accountService.UpdateUserAsync(user);
                    if (result)
                    {
                        res.HandleSuccess("Cập nhật người dùng thành công");
                    }
                    else
                    {
                        res.HandleError("Cập nhật người dùng thất bại");
                    }
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                res.HandleError($"Có lỗi xảy ra khi cập nhật người dùng: {ex.Message}");
                return BadRequest(res);
            }
        }

        [HttpDelete("users/{id}")]
        [Authorize(Roles = "Admin")] // Chỉ admin mới có quyền truy cập
        public async Task<IActionResult> DeleteUser(int id)
        {
            var res = new ResOutput();

            try
            {
                var deleted = await _accountService.DeleteUserAsync(id);
                if (deleted)
                {
                    res.HandleSuccess("Xóa người dùng thành công");
                }
                else
                {
                    res.HandleError("Xóa người dùng thất bại");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                res.HandleError(ex.Message);
                return BadRequest(res);
            }
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var res = new ResOutput();

            try
            {
                if (!ModelState.IsValid)
                {
                    res.HandleError("Thất bại");
                }
                else
                {
                    var result = await _accountService.ForgotPasswordAsync(request);
                    if (result)
                    {
                        res.HandleSuccess("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn");
                    }
                    else
                    {
                        res.HandleError("Không tìm thấy email");
                    }
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                res.HandleError(ex.Message);
                return BadRequest(res);
            }
        }
    }
}