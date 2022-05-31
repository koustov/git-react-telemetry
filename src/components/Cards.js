import React from 'react'
import StatisticsCard from './StatisticsCard'
import LineChartCard from './LineChartCard'
import ProfileCard from './ProfileCard'

const common_stat_card = (type, title, subtitle, api) => {
  return (
    <StatisticsCard type={type} title={title} subtitle={subtitle} api={api} />
  )
}

const common_line_card = (
  type,
  title,
  subtitle,
  api,
  primaryDataKey,
  key1,
  key2,
  data_formatter
) => {
  return (
    <LineChartCard
      type={type}
      title={title}
      subtitle={subtitle}
      api={api}
      primaryDataKey={primaryDataKey}
      series_key_1={key1}
      series_key_2={key2}
      data_formatter={data_formatter}
    />
  )
}

const common_profile_card = (type, title, subtitle, api, data_formatter) => {
  return (
    <ProfileCard
      type={type}
      title={title}
      subtitle={subtitle}
      api={api}
      data_formatter={data_formatter}
    />
  )
}

const no_formatter = (data) => {
  return data
}

export const get_card = (type, api) => {
  switch (type) {
    case 'weekly_commits':
      return common_line_card(
        type,
        'Commits',
        'Recent By Week',
        api,
        undefined,
        'Added',
        'Removed'
      )
    case 'last_year_commits':
      return common_line_card(
        type,
        'Commits',
        'Last year by Week',
        api,
        undefined,
        'Commits'
      )
    case 'hourly_commits':
      return common_line_card(
        type,
        'Commits',
        'Last year by hour',
        api,
        'Hour',
        'Commits'
      )
    case 'hourl_trend':
      return common_line_card(
        'hourly_commits',
        'Commits',
        'Hourly trend',
        api,
        'Hour',
        'Commits',
        undefined,
        (data) => {
          const sum = (items, prop, value) => {
            const sum_res = []
            items.forEach((it) => {
              const current_prop_name = it[prop]
              const current_prop_value = it[value]
              const e_object = sum_res.filter(
                (s) => s[prop] === current_prop_name
              )
              if (e_object.length < 1) {
                sum_res.push({
                  [prop]: current_prop_name,
                  [value]: current_prop_value
                })
              } else {
                e_object[0][value] = e_object[0][value] + current_prop_value
              }
            })
            return sum_res
          }
          const res = sum(data, 'Hour', 'Commits')
          return res
        }
      )
    // case 'weekly_commit_count': return common_line_card('weekly_commit_count', 'Commit', 'By Week', user, repo, weekly_data_formatter, 'all', '');
    // case 'contributors':
    //   return common_line_card(
    //     'weekly_commit_count',
    //     'Contributors',
    //     'A year by week',
    //     config,
    //     contributors_activity_data_formatter,
    //     undefined,
    //     'Contributors',
    //     accessToken
    //   )
    // case 'commit_by_contributor':
    //   return common_stat_card(
    //     'contributor_commit',
    //     'Commit',
    //     'By Contributor',
    //     config
    //   )
    // case 'commit_by_day':
    //   return common_stat_card('commit_by_day', 'Commit', 'By Day', config)

    // case 'repo_contributors':
    //   return common_stat_card(
    //     'repo_contributors',
    //     'Contributors',
    //     'In Total',
    //     config
    //   )
    case 'all_issues':
      return common_stat_card(type, 'Issues', 'In Total', api)
    case 'all_forks':
      return common_stat_card(type, 'Forks', 'In Total', api)
    case 'all_topics':
      return common_stat_card(type, 'Topics', 'In Total', api)
    case 'all_tags':
      return common_stat_card(type, 'Tags', 'In Total', api)
    case 'all_releases':
      return common_stat_card(type, 'Releases', 'In Total', api)
    case 'all_milestones':
      return common_stat_card(type, 'Milestones', 'In Total', api)

    case 'all_branches':
      return common_stat_card(type, 'Branches', 'In Total', api)
    case 'all_pulls_open':
      return common_stat_card(type, 'Pulls', 'Open State', api)
    case 'all_pulls_closed':
      return common_stat_card(type, 'Pull', 'Close State', api)

    // case 'all_pulls_open':
    //   return common_stat_card(
    //     'all_pulls_open',
    //     'Pull Requests',
    //     'Total Open',
    //     config
    //   )
    // case 'all_pulls':
    //   return common_stat_card('all_pulls', 'Pull Requests', 'In Total', config)
    case 'star_gazers':
      return common_profile_card(type, 'Star Gazers', 'In Total', api)

    case 'all_contributors':
      return common_profile_card(
        type,
        'Contributors',
        'In Total',
        api,
        (data) => {
          data.forEach((d) => {
            d.avatar_url = d.author.avatar_url
            d.login = d.author.login
          })
          return data
        }
      )
    case 'all_collaborators':
      return common_profile_card(type, 'Collaborators', 'In Total', api)
    // case 'all_branches':
    //   return common_stat_card('all_branches', 'Branches', 'In Total', config)
    // case 'all_collaborators':
    //   return common_stat_card(
    //     'all_collaborators',
    //     'Collaborators',
    //     'In Total',
    //     config
    //   )

    // case 'all_contributors':
    //   return common_profile_card(
    //     'repo_contributors',
    //     'Contributors',
    //     'In Total',
    //     config,
    //     no_formatter,
    //     undefined,
    //     undefined,
    //     undefined,
    //     colspan
    //   )
  }
}
