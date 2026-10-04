"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUserInputValid = exports.isPasswordValid = void 0;
const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/;
    if (passwordRegex.test(password)) {
        return true;
    }
    return false;
};
exports.isPasswordValid = isPasswordValid;
const IsUserInputValid = ({ name, email, password }, login = false) => {
    if (!login) {
        if (!name || !email || !password)
            return false;
    }
    else if (login) {
        if (!email || !password)
            return false;
    }
    return true;
};
exports.IsUserInputValid = IsUserInputValid;
