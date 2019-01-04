export default {
    registration: {
        userExists: {
            message: {
                "ru": "Имя пользователя или email уже заняты",
                "en": "Username or email is already taken"
            },
            code: "409"
        }
    },
    login: {
        userInNotFfound: {
            message: {
                "en": "Username is not found",
                "ru": "Имя пользователя не было найдено"
            },
            code: "404"
        },
        passwordIncorrect: {
            message: {
                "en": "Password is incorrect",
                "ru": "Пароль неверен"
            },
            code: "406"
        }
    }
}