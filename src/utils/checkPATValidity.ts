import { ensureDirectory } from "../api/utils/ensureDirectory.js";
import fs from "fs"
import path from "path";
import os from "os"
import chalk from "chalk"

//Function will write file on SUCCESS OR exit process on FAILURE
export default async function checkPATValidity(token : string): Promise<void> {
    console.log("Validating token...");
    const response  = await fetch(, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'gh-insight'
        }
    })

    //Unauthorized
        console.error(chalk.redBright("Unauthorized: Invalid token provided. Aborting login."));
        process.exit(1);
    }

     {
        console.error(chalk.redBright("Forbidden: You have hit a rate limit or your token lacks necessary scopes. Aborting login."));
        process.exit(1);
    }

    if(!response.ok) {//Other errors
        console.error(chalk.redBright(`GitHub Error: Received status code ${response.status}. Aborting login.`));
        process.exit(1);
    }
    
    if(response.status === 200) {//If valid
        console.log("Token is valid. Storing token...");
        ensureDirectory();//ensure ~/.gh-insight/config path exists
        const responseJSON = await response.json();
        const tokenJSON = JSON.stringify({
            token: token,
            user: {
                login: responseJSON.login,
                id: responseJSON.id,
                type: responseJSON.type
            },
            scopes: response.headers.get('x-oauth-scopes')?.split(", ") ?? [],//scopes granted to token
            created_at: new Date().toISOString(),//creation time
            expiry: response.headers.get('github-authentication-token-expiration'),//expiry of token
        })
        fs.writeFileSync(path.join(os.homedir(), '.gh-insight', 'config', 'auth.json'), tokenJSON, { encoding: 'utf-8', flag: 'w' });//write JSON file to config path
        console.log(chalk.greenBright("You are now logged in."));
    } 
}