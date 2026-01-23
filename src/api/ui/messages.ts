import { colors as c } from "./colors.js";

export const messages = {
    validatingPAT: () => console.log(`${c.info("ℹ")} Validating GitHub Personal Access Token...`),
    PATValid: () => console.log(`${c.success("✔")} Token is valid! Authentication successful.`),
    errorMessage: (errorMsg: string) => console.error(`${c.error("✖")} ${errorMsg}`),
}