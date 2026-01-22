import { colors as c } from "./colors.js";

export const messages = {
    validatingPAT: () => console.log(`${c.info("ℹ")} Validating GitHub Personal Access Token...`),
    PATValid: () => console.log(`${c.success("✔")} Token is valid! Authentication successful.`),
    PATInvalid: (errorMsg: string) => console.error(`${c.error("✖")} Token is invalid. ${errorMsg}`),
    PATMissingScopes: (missingScopes: string[]) => console.warn(`${c.warn("⚠")} Token is missing required scopes: ${missingScopes.join(", ")}`,)
}