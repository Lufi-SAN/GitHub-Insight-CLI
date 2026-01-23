import {promptForToken} from "../api/ui/auth.ui.js";
import checkPATValidity from "../api/services/auth.service.js";
import { messages } from "../api/ui/messages.js";

export default async function authLoginCommand(token: string) {
    if (token) {
        await checkPATValidity(token)
    }
    if (!token) {
        const PAToken = await promptForToken();
        token = PAToken;
        await checkPATValidity(token)
    }
    if (!token) {
        messages.PATInvalid("No token provided. Exiting.");
        process.exit(1);
    }
}