import React, { useState } from 'react'

import { GitStat } from 'react-git-repository-stat'
import logo from './assets/ico.png'
import 'react-git-repository-stat/src/index.css'
import { Fragment } from 'react/cjs/react.production.min'

const KEY_GROUP = [
  {
    display: 'Commit Trend',
    id: 'kg-ct',
    values: [
      'weekly_commits',
      'last_year_commits',
      'hourly_commits',
      'hourl_trend'
    ]
  },
  {
    display: 'Health statistics',
    id: 'kg-hs',
    values: [
      'all_issues',
      'all_topics',
      'all_tags',
      'all_releases',
      'all_milestones'
    ]
  },
  {
    display: 'Interaction statistics',
    id: 'kg-is',
    values: ['all_pulls_open', 'all_pulls_closed', 'all_branches', 'all_forks']
  },
  {
    display: 'Star Gazers',
    id: 'kg-sg',
    values: ['star_gazers']
  },
  {
    display: 'Contributors',
    id: 'kg-cb',
    values: ['all_contributors']
  },
  {
    display: 'Collaborators',
    id: 'kg-cl',
    values: ['all_collaborators']
  }
]
const background =
  "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E')"
const App = () => {
  const [user, setUser] = useState('atapas')
  const [repo, setRepo] = useState('react-play')
  const [types, setTypes] = useState(KEY_GROUP)
  const [personalAccessToken, setPersonalAccessToken] = useState(
    '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'
  )
  const [data, setData] = useState({
    user: user,
    repo: repo
  })

  const update_data = () => {
    setData({
      user: user,
      repo: repo,
      personalAccessToken: personalAccessToken
    })
  }
  return (
    <div className='outer-box'>
      <h1>
        <img className='logo' src={logo} alt='logo' />
        <span className='header-light'>The</span>
        <span className='header-bold'>&nbsp;GitHub Telemetry</span>
      </h1>
      <hr />
      <div className='form-row'>
        <div className='form'>
          <div className='form-cell'>
            <div>
              <label htmlFor='username'>Username</label>
            </div>
            <div>
              <input
                type='text'
                id='username'
                name='username'
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder='user name'
                required
              />
            </div>
          </div>
          <div className='form-cell'>
            <div>
              <label htmlFor='repo'>Repository</label>
            </div>
            <div>
              <input
                type='text'
                id='repo'
                name='password'
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder='repo name'
                required
              />
            </div>
          </div>
          <div className='form-cell'>
            <div>
              <label htmlFor='repo'>
                Access Token
                <br />
                <a
                  href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
                  target='_blank'
                  rel='noreferrer'
                >
                  <small>(what's this)</small>
                </a>
              </label>
            </div>
            <div>
              <input
                type='password'
                id='accesstoken'
                name='password'
                value={personalAccessToken}
                onChange={(e) => setPersonalAccessToken(e.target.value)}
                placeholder='personal access token'
                required
              />
            </div>
          </div>
          <div className='form-cell'>
            <input
              type='submit'
              name='submit'
              value='Submit'
              onClick={() => update_data()}
            />
          </div>
        </div>
      </div>
      <div className='form-row'>
        <div className='selectBoxGroup'>
          {types.map((t, ti) => {
            return (
              <div className='selectBox' key={ti}>
                <input
                  type='checkbox'
                  name={`chk-${t.name}`}
                  id={`chk-${t.name}`}
                  checked={t.selected}
                  // onClick={(e) => {
                  //   types[ti].selected = e.target.checked
                  //   setTypes([...types])
                  //   console.log(JSON.stringify(types))
                  // }}
                />
                <label
                  htmlFor={`chk-${t.name}`}
                  onClick={(e) => {
                    types[ti].selected = !types[ti].selected
                    setTypes([...types])
                    console.log(JSON.stringify(types))
                  }}
                >
                  {t.display}
                </label>
              </div>
            )
          })}
        </div>
      </div>
      {data.user && data.repo ? (
        <div>
          {types.map((t, ti) => {
            return (
              <Fragment>
                {t.selected ? (
                  <div className='stat-row'>
                    <div>
                      <h1>{t.display}</h1>
                    </div>
                    <div>
                      <GitStat
                        user={data.user}
                        repo={data.repo}
                        bgimage={background}
                        accessToken={personalAccessToken}
                        types={t.values}
                      />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            )
          })}
        </div>
      ) : null}
      {/* <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="user name"/>
    <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="repo name"/>
    <button type='submit' onClick={() => update_data()}>Submit</button> */}
    </div>
  )
}

export default App
