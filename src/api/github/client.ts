import type { RequestOptions } from "http";
import type { GitHubUser } from "./types.js";

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

    async request(endpoint: string): Promise<GitHubUser> {
        const url = `${BASE_URL}${endpoint}`;
        
        const response = await fetch(url, {
            headers: this.getHeaders(),
        });

        const remainingHeader = response.headers.get('x-ratelimit-remaining');
        const resetHeader = response.headers.get('x-ratelimit-reset');

        if(response.status === 401) {
            throw new Error("Unauthorized: Invalid or missing token.");
        }

        if(response.status === 429 || response.status === 403) {
            const waitTime = resetHeader ? Math.max(0, parseInt(resetHeader) * 1000 - Date.now()) : 60000;
            await new Promise(resolve => setTimeout(resolve, waitTime));

            
        }

        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
        }

        if (response.status === 200) {
            const user = await response.json();
            return user as GitHubUser;
        }

        throw new Error("Forbidden: You have hit a rate limit or your token lacks necessary scopes.");
    }
}

const github = new GitHubClient(PAT);
{token: PAT}
github.request('/user', )