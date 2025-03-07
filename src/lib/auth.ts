export function getJwtSecretKey(): string {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('JWT Secret key is not set in environment variables')
    }

    return secret
} 