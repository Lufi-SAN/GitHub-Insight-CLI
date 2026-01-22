import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.gh-insight', 'config');
const CACHE_DIR = path.join(os.homedir(), '.gh-insight', 'cache');

export function ensureDirectory(): void {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}
