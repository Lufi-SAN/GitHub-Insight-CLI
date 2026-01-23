import {promptForToken} from "../api/ui/auth.ui.js";
import checkPATValidity from "../api/services/auth.service.js";
import { messages } from "../api/ui/messages.js";
import { networkError, storeError } from "../api/utils/customErrors.js";

export default async function authLoginCommand(token: string) {
    if (token) {
        try {
            await checkPATValidity(token)
        } catch (error) {
            if (error instanceof Error || error instanceof networkError || error instanceof storeError) {
                messages.errorMessage(error.message);
                process.exit(1);
            }
        }
        return;
    }
    
    if (!token) {
        const PAToken = await promptForToken();
        token = PAToken;
    }

    if (!token) {
        messages.errorMessage("No token provided. Exiting.");
        process.exit(1);
    }

    try {
        await checkPATValidity(token)
    } catch (error) {
        if (error instanceof Error || error instanceof networkError || error instanceof storeError) {
            messages.errorMessage(error.message);
            process.exit(1);
        }
    }
    return
}