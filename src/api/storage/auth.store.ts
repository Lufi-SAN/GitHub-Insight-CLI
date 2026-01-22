import fs from "fs"
import path from "path";
import os from "os"
import { ensureDirectory } from "../utils/ensureDirectory.js";

export function storeAuth(tokenData: string): void {
    const tokenJSON = tokenData;
    ensureDirectory();//ensure ~/.gh-insight/config path exists
    fs.writeFileSync(path.join(os.homedir(), '.gh-insight', 'config', 'auth.json'), tokenJSON, { encoding: 'utf-8', flag: 'w' })
}