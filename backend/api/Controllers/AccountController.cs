using System;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Models.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UsersContext db;

        public AccountController(UsersContext usersContext)
        {
            db = usersContext;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] RegistrationUser data)
        {
            var now = DateTime.Now;
            User user = new User { CreatedAt = now, UpdatedAt = now, Role = "User"};

            PropertyInfo[] properties = typeof(RegistrationUser).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                var value = property.GetValue(data);
                var userProperty = user.GetType().GetProperty(property.Name);
                if (userProperty != null)
                {
                    userProperty.SetValue(user, value);
                }
            }

            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            string passwordHash = passwordHasher.HashPassword(user, user.Password);
            user.Password = passwordHash;

            db.Add(user);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetUser", "Users", new { id = user.Id }, user);
        }
    }
}