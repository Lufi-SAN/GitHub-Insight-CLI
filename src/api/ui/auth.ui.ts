import prompts from "prompts";

export async function promptForToken(): Promise<string> {
    const prompt = await prompts({
        type: 'invisible',
        name: 'PAToken',
        message: `To use gh-insight, you need a GitHub Personal Access Token.

Scopes required:
- read:user
- public_repo

Create one here:
https://github.com/settings/tokens

Paste your token below (input hidden):`,
    });
    return prompt.PAToken;
}