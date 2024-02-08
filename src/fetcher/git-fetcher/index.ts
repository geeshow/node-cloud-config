import {Fetcher} from "../index";

const { Octokit } = require("@octokit/rest");

export interface FetchEnvFileParam {
  token: string;
  owner: string;
  repo: string;
  path: string;
  branch: string;
}

export class GitFetcher implements Fetcher {
  async fetchEnvFile(param: { token: string; owner: string; repo: string; path: string; branch: string }) {
    const octokit = new Octokit({ auth: param.token });
    const result = await octokit.repos.getContent({
      owner: param.owner,
      repo: param.repo,
      path: param.path,
      ref: param.branch,
    });
    
    return this.decodeContent(result.data.content);
  }
  
  decodeContent(content: string) {
    return Buffer.from(content, 'base64').toString('utf8');
  }
}

