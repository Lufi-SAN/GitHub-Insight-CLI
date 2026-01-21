// src/api/github/types.ts
import type { components } from "./github.schema.js";

export type GitHubUser = components["schemas"]["public-user"];
export type GitHubRepo = components["schemas"]["repository"];
