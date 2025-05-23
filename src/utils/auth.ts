import { IisPasswordValid, IisUserInputValid } from '../types/auth'

export const isPasswordValid: IisPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/;

    if (passwordRegex.test(password)) {
        return true
    }

    return false
}

export const IsUserInputValid: IisUserInputValid = ({ name, email, password }) => {
    if (!name || !email || !password) return false

    return true
}