#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
const program = new Command();

program
  .name('gh-insight')
  .description('A CLI tool to gain insights from GitHub repositories.')
  .version('1.0.0');

program
  .command("ping")
  .description("Check CLI is working")
  .action(() => {
    console.log(chalk.greenBright("gh-insight is alive 🚀"));
  });
  
program.parse(process.argv);
