import type { GitHubUser } from "./types.js";
import networkError from "../utils/customErrors.js";

const BASE_URL = "https://api.github.com/user"

export default class GitHubClient {
    constructor(public token?: string) {}

    private getHeaders(custom? : Record<string, string>) {
        return {
            "User-Agent": "gh-insight",
            ...(this.token ? { "Authorization": `Bearer ${this.token}` } : {}),
            ...custom
        }
    }

    async request(endpoint: string): Promise<[GitHubUser, string | null, string[]]> {
        const url = `${BASE_URL}${endpoint}`;
        
        const response = await fetch(url, {
            headers: this.getHeaders(),
        });

        const remainingHeader = response.headers.get('x-ratelimit-remaining');
        const resetHeader = response.headers.get('x-ratelimit-reset');

        let rateLimitCode : string  = "undefined";
        if(response.status === 401) {
            throw new networkError("401", "Unauthorized: Invalid or missing token.");
        }

        if(response.status === 429 || response.status === 403) {
            rateLimitCode = (response.status).toString();
            const waitTime = resetHeader ? Math.max(0, parseInt(resetHeader) * 1000 - Date.now()) : 60000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        if (!response.ok) {
            throw new networkError((response.status).toString(), `GitHub API request failed: ${response.status} ${response.statusText}`);
        }

        if (response.status === 200) {
            const tokenExpiry = response.headers.get('github-authentication-token-expiration')
            const scopes = response.headers.get('x-oauth-scopes')?.split(", ") ?? [];
            if (scopes.length === 0 || !scopes.includes("read:user") || !scopes.includes("public_repo")) {
                throw new networkError("403", "Forbidden: Token lacks necessary scopes.");
            }
            const user = await response.json();
            return [user as GitHubUser, tokenExpiry, scopes];
        }

        throw new networkError(rateLimitCode, "Forbidden: You have hit a rate limit or your token lacks necessary scopes.");
    }
}
