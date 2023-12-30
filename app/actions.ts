"use server"

export const verifyPassword = async (inputPassword: string) => {
    if (inputPassword == "saul") {
        return true;
    } else {
        return false;
    }
}