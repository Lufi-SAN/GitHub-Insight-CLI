import GitHubClient from "./client.js"
import type { GitHubUser } from "./types.js"
import { authEndpoints } from "./endpoints.js"
import {networkError} from "../utils/customErrors.js";

export async function authClient(PAT?: string) {
    const client = new GitHubClient(PAT);
    try {
        const [responseJSON, expiry, scopes] = await client.request(authEndpoints.getUser)
        const tokenJSON = JSON.stringify({
            token: PAT,
            user: {
                login: responseJSON.login,
                id: responseJSON.id,
                type: responseJSON.type
            },
            scopes: scopes,//scopes granted to token
            created_at: new Date().toISOString(),//creation time
            expiry: expiry,//expiry of token
        })
        return tokenJSON
    } catch (error) {
        if (error instanceof networkError) {
            throw error
        }
        throw new Error("Failed to fetch" + error);
    }
}