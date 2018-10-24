﻿using System;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        private string Password { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
