import { cards, get_card } from "./components/Cards";
import GitAPI from "git-repo-api";
const URLs = {
    weekly_commit: 'repos/{owner}/{repo}/stats/code_frequency',
    last_year_commit: 'repos/{owner}/{repo}/stats/commit_activity',
    contributor_commit: 'repos/{owner}/{repo}/stats/contributors',
    contributor_commit_chart: 'repos/{owner}/{repo}/stats/contributors',
    weekly_commit_count: 'repos/{owner}/{repo}/stats/participation',
    commit_by_day: 'repos/{owner}/{repo}/stats/punch_card',
    all_issues: 'repos/{owner}/{repo}/issues',
    all_forks: 'repos/{owner}/{repo}/forks',
    repo_contributors: 'repos/{owner}/{repo}/contributors',
    all_topics: 'repos/{owner}/{repo}/topics',
    all_tags: 'repos/{owner}/{repo}/tags',
    all_releases: 'repos/{owner}/{repo}/releases',
    all_pulls_open: 'repos/{owner}/{repo}/pulls',
    all_pulls: 'repos/{owner}/{repo}/pulls?state=all',
    star_gazers: 'repos/{owner}/{repo}/stargazers',
    all_branches: 'repos/{owner}/{repo}/branches',
    all_collaborators: 'repos/{owner}/{repo}/collaborators',
    all_milestones:'repos/{owner}/{repo}/milestones'
}

export const request = (type, config, node, formatter) => {
  
    // const api = new GitAPI(process.env.PERSONAL_ACCESS_TOKEN);
    const options = {
        'method': 'GET',
        // 'username': data.login,
        'headers': {
          'Accept': 'application/vnd.github.v3+json',
          'user-agent': `${config.user}`,
          'authorization': `token ${config.accessToken}`
        }
      }


    const final_url = URLs[type].replace('{owner}', config.user).replace('{repo}', config.repo)
    return fetch(`https://api.github.com/${final_url}`, options).then(res => {
        return res.json().then(r => {
          const d = node ? r[node]: r;
          if(formatter) {
            return formatter(d)
          } else {
            return d;
          }
        })
       
        // if(formatter) {
        //   console.log('yyy')
        //   console.log(formatter)
        //   console.log(res)
        //   return res.json().then(r => {
        //     return formatter(r)
        //   })
        //   // return formatter(res.json())
        // } else {
        //   return res.json();
        // }
      })
}
