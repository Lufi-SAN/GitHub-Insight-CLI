import { ensureDirectory } from "../ensureDirectory.js";
import fs from "fs"
import path from "path";
import os from "os"
import chalk from "chalk"
import { create } from "domain";

//Function will write file on SUCCESS OR exit process on FAILURE
export default async function checkPATValidity(token : string): Promise<void> {
    console.log("Validating token...");
    const response  = await fetch('https://api.github.com/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'gh-insight'
        }
    })
    
    if(response.status === 200) {//If valid
        ensureDirectory();//ensure ~/.gh-insight/config path exists
        const tokenJSON = JSON.stringify({
            token: token,
            user: {
                login:,
                id:,
                type:
            },
            scopes: response.headers.get('x-oauth-scopes')?.split(", ") ?? [],//scopes granted to token
            created_at: new Date().toISOString(),//creation time
            expiry: response.headers.get('github-authentication-token-expiration'),//expiry of token
        })
        fs.writeFileSync(path.join(os.homedir(), '.gh-insight', 'config', 'auth.json'), tokenJSON, { encoding: 'utf-8', flag: 'w' });//write JSON file to config path
        console.log(chalk.greenBright("Token is valid! You are now logged in."));
    } else {
        console.error(chalk.redBright("Invalid token provided. Aborting login."));
        process.exit(1);
    }
}