export type Credentials = {
    email: string;
    password: string;
}

export type LoginResponse = {
    session: string;
}

 export type TokenResponse = {
    token: string;
}