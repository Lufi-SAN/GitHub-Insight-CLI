#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import prompts from 'prompts'
import authLoginCommand from './commands/authLogin.command.js';

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
                await authLoginCommand(token);
      })
  );
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
