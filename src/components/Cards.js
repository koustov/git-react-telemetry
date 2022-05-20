import React from "react"
import { unixToDate } from "../utils"
import StatisticsCard from "./StatisticsCard"
import LineChartCard from "./LineChartCard"
import ProfileCard from "./ProfileCard"


const common_stat_card = (type, title, subtitle, config) => {
    return (
        <StatisticsCard type={type} title={title} subtitle={subtitle} config={config}/>
    )
}

const common_line_card = (type, title, subtitle, config, data_formatter, node, key1, key2) => {
    return (
        <LineChartCard type={type} title={title} subtitle={subtitle} config={config} node={node} series_key_1={key1}  series_key_2={key2} formatter={(data) =>data_formatter(data)}/>
    )
}

const common_profile_card = (type, title, subtitle, config, data_formatter, node, key1, key2) => {
    return (
        <ProfileCard type={type} title={title} subtitle={subtitle} config={config} node={node} series_key_1={key1}  series_key_2={key2} formatter={(data) =>data_formatter ? data_formatter(data): null}/>
    )
}

const weekly_commit_data_formatter = (data) => {
    const res = [];
    if(data && Array.isArray(data)){
        data.forEach(r => 
            res.push({
                name: unixToDate(r['0']),
                Commits: r['1']
            })
        )
    }
    return res;
}

const yearly_activity_data_formatter = (data) => {
    const res = [];
    // console.error('XXXX')
    // console.error(data)
    if(data && Array.isArray(data)){
        data.forEach(r => 
            res.push({
                name: unixToDate(r.week),
                Commits: r.total,
        })
    )
    }
    return res;
}

const contributors_activity_data_formatter = (data) => {
    const res = [];
    // console.error('XXXX')
    // console.error(data)
    if(data && Array.isArray(data)){
        data.all.forEach((r, i) => 
            res.push({
                name: `Week ${i}`,
                Contributors: r,
            })
        )
    }
    return res;
}


const no_formatter = (data) => {
    return data;
}


export const get_card = (type, user, repo, colspan, accessToken) => {

    const config = {
        user: user,
        repo: repo,
        accessToken: accessToken
    }
    switch(type){
        case 'weekly_commit': return common_line_card('weekly_commit', 'Push', 'Recent By Week', config, weekly_commit_data_formatter,undefined ,'Commits');
        case 'yearly_commit': return common_line_card('last_year_commit', 'Commits', 'Last year by Week', config, yearly_activity_data_formatter,undefined, 'Commits'); 
        // case 'weekly_commit_count': return common_line_card('weekly_commit_count', 'Commit', 'By Week', user, repo, weekly_data_formatter, 'all', ''); 
        case 'contributors': return common_line_card('weekly_commit_count', 'Contributors', 'A year by week', config, contributors_activity_data_formatter, undefined, 'Contributors', accessToken); 
        case 'commit_by_contributor': return common_stat_card('contributor_commit', 'Commit', 'By Contributor', config);
        case 'commit_by_day': return common_stat_card('commit_by_day', 'Commit', 'By Day', config);
        case 'all_issues': return common_stat_card('all_issues', 'Issues', 'In Total', config);
        case 'repo_contributors': return common_stat_card('repo_contributors', 'Contributors', 'In Total', config);
        case 'all_forks': return common_stat_card('all_forks', 'Forks', 'In Total', config);
        case 'all_topics':return common_stat_card('all_topics', 'Topics', 'In Total', config);
        case 'all_tags':return common_stat_card('all_tags', 'Tags', 'In Total', config);
        case 'all_releases':return common_stat_card('all_releases', 'Releases', 'In Total', config);
        case 'all_pulls_open':return common_stat_card('all_pulls_open', 'Pull Requests', 'Total Open', config);
        case 'all_pulls':return common_stat_card('all_pulls', 'Pull Requests', 'In Total', config);
        case 'star_gazers':return common_profile_card('star_gazers', 'Star Gazers', 'In Total', config, no_formatter, undefined, undefined, undefined,colspan);
        case 'all_branches':return common_stat_card('all_branches', 'Branches', 'In Total', config);
        case 'all_collaborators':return common_stat_card('all_collaborators', 'Collaborators', 'In Total', config);
        case 'all_milestones':return common_stat_card('all_milestones', 'Milestones', 'In Total', config);
        case 'all_contributors':return common_profile_card('repo_contributors', 'Contributors', 'In Total', config, no_formatter, undefined, undefined, undefined,colspan);
    } 
}