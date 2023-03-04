interface Auth {
    username: string,
    password: string,
    logged_at: Date,
    expiration_time: number // milliseconds
}

export default Auth;