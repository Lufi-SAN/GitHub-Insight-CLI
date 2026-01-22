import {authClient} from "../github/auth.js";
import {storeAuth} from "../storage/auth.store.js";

export default async function checkPATValidity(token: string) {
    try {
        const tokenData = await authClient(token);
        await storeAuth(tokenData);
        console.log("Authentication successful! Token data:");
        console.log(tokenData);
    } catch (error) {
        console.error("Authentication failed:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}