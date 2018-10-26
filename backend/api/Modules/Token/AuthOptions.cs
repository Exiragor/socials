﻿using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace api.Modules.Token
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer"; // издатель токена
        public const int LIFETIME = 60; // время жизни токена - 1 минута

        public static SymmetricSecurityKey GetSymmetricSecurityKey(string secretKey)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        }
    }
}