#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import prompts from 'prompts'

const program = new Command();

program
  .name('gh-insight')
  .description('A CLI tool to gain insights from GitHub repositories.')
  .version('1.0.0');

program
  .command('ping')
  .description("Check CLI is working")
  .action(() => {
    console.log(chalk.greenBright("gh-insight is alive 🚀"));
  });
  
program
  .command('auth')
  .description('Authentication commands')
  .addCommand(
    new Command('login')
      .option('-t, --token <token>', 'GitHub Personal Access Token')
      .description('Authenticate with GitHub using a Personal Access Token')
      .action( async (options) => {
                let token : string = options.token;//extract token option from option object

                if(token) {//if token present
                  await checkPATValidity(token)
                  return;
                }

                if (!token) {//Interactive prompt for token if typeof token === "undefined"
                  const response = await prompts({
                  type: 'invisible',
                  name: 'token',
                  message: `To use gh-insight, you need a GitHub Personal Access Token.

Scopes required:
- read:user
- public_repo

Create one here:
https://github.com/settings/tokens

Paste your token below (input hidden):`
                  });
                  token = response.token;
                }

                if (!token) {//error & 
                  console.error(chalk.redBright("No token provided. Aborting login."));
                  process.exit(1);
                }

                await checkPATValidity(token)
                return;
              })
  )
  // .addCommand(
  //   new Command('logout')
  //     .description('Logout from GitHub by removing stored token')
  //     .action( () => {
  //       const fs = require('fs');
  //       const path = require('path');
  //       const os = require('os');
  //       const tokenPath = path.join(os.homedir(), '.gh-insight', 'config', 'token.json');
  //       fs.rm
  //     }
  // )
program.parse(process.argv);
