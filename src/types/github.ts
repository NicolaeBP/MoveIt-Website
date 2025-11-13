export interface GitHubAsset {
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
}

export interface GitHubRelease {
    tag_name: string;
    name: string;
    body: string;
    published_at: string;
    assets: GitHubAsset[];
}
