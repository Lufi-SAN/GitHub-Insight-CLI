import fs from "fs"
import path from "path";
import os from "os"
import { ensureDirectory } from "../utils/ensureDirectory.js";
import { storeError } from "../utils/customErrors.js";

export function storeAuth(tokenData: string): void {
    try {
        const tokenJSON = tokenData;
        ensureDirectory();//ensure ~/.gh-insight/config path exists
        fs.writeFileSync(path.join(os.homedir(), '.gh-insight', 'config', 'auth.json'), tokenJSON, { encoding: 'utf-8', flag: 'w' })
    } catch (error) {
        if ('code' in (error as any)) { 
            throw new storeError('store', (error as any).code);
        }
        throw new Error("Failed to store auth data: " + error);
    }
}