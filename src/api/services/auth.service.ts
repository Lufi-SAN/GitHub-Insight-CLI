import {authClient} from "../github/auth.js";
import {storeAuth} from "../storage/auth.store.js";

export default async function checkPATValidity(token: string) {
    try {
        const tokenData = await authClient(token);
        await storeAuth(tokenData);
        
    } catch (error) {
        throw new Error("Invalid token or unable to authenticate.");
    }
}