export const authEndpoints = {
    getUser: "/user",
    rateLimit: "/rate_limit",
}

export const userEndpoints = {
    getUser: "/user",
    getUserByUsername: (username: string) => `/users/${username}`,
    getUserReposByUsername: (username: string) => `/users/${username}/repos`,
    getFollowersByUsername: (username: string) => `/users/${username}/followers`,
    getFollowingByUsername: (username: string) => `/users/${username}/following`,
    getEventsByUsername: (username: string) => `/users/${username}/events`,
    getStarredByUsername: (username: string) => `/users/${username}/starred`,
}

export const repoEndpoints = {
    getRepo: (owner: string, repo: string) => `/repos/${owner}/${repo}`,
    getRepoCommits: (owner: string, repo: string) => `/repos/${owner}/${repo}/commits`,
    getRepoLanguages: (owner: string, repo: string) => `/repos/${owner}/${repo}/languages`,
    getRepoIssues: (owner: string, repo: string) => `/repos/${owner}/${repo}/issues`,
    getRepoPulls: (owner: string, repo: string) => `/repos/${owner}/${repo}/pulls`,
    getRepoContributors: (owner: string, repo: string) => `/repos/${owner}/${repo}/contributors`,
    getRepoReleases: (owner: string, repo: string) => `/repos/${owner}/${repo}/releases`,
}

export const insightEndpoints = {
    getTopLanguages: "/languages",
    getBusFactor: "/bus-factor",
    getCommitVelocity: "/commits",//also for repo activity
    getRepoActivity: "/events",
    getIssueHealth: "/issues",
    getPullRequestVelocity: "/pulls",
    getUserFootprint: (user: string) => `/users/${user}/repos`,
}

export const rateLimitEndpoints = {
    getRateLimit: "/rate_limit",
}