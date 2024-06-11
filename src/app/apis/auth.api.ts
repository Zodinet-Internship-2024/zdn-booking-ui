class AuthApi {
    private URL: string;

    constructor() {
        this.URL = process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost:5000';
    }
    async signIn(username: string, password: string) {
        const res = await fetch(`${this.URL}/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, phone: username, password }),
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }
}

const authApi = new AuthApi();
export default authApi;
