import {authClient} from "../github/auth.js";
import {storeAuth} from "../storage/auth.store.js";
import {networkError, storeError} from "../utils/customErrors.js";

export default async function checkPATValidity(token: string) {
    try {
        const tokenData = await authClient(token);
        await storeAuth(tokenData);
    } catch (error) {
        if (error instanceof networkError || error instanceof storeError) {
            throw error
        } else {
            throw new Error("An unecpected error occurred whilst validating PAT: " + error);
        }
    }
}