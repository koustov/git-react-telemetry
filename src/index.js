import React, { Fragment, useEffect, useState } from 'react'
import './index.css'
import Card from './components/Card.js'
import { get_card } from './components/Cards'
import { get_cards } from './stat-service'
import { GitAPI } from 'git-repo-api'

export const GitStat = ({
  accessToken,
  types,
  user,
  repo,
  columns = 4,
  bgimage,
  bgcolor
}) => {
  let apiTemp
  const [loading, setLoading] = useState(true)
  const [apiObject, setApiObject] = useState()
  const [statTypes, setStatTypes] = useState(types)
  const [apiAccessToken, setApiAccessToken] = useState()
  const [apiUser, setApiUser] = useState()
  const [apiRepo, setApiRepo] = useState()

  useEffect(() => {
    window.process = {
      ...window.process
    }
    const apiObj = new GitAPI(accessToken, user, repo)
    apiTemp = new GitAPI(accessToken, user, repo)
    setApiObject({ ...apiObj })
    setStatTypes(types)
    setApiAccessToken(accessToken)
    setApiUser(user)
    setApiRepo(repo)
    setLoading(false)
  }, [])

  const get_data = (type) => {
    if (type) {
      const apiObj = new GitAPI(accessToken, user, repo)
      return apiObj.get(type)
    }
  }

  return (
    <div>
      {!loading && statTypes.length ? (
        <div
          className='card-grid'
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            backgroundImage: bgimage,
            background: bgcolor
          }}
        >
          {statTypes.map((t, ti) => {
            return (
              <Fragment key={ti}>{get_card(t, get_data, columns)}</Fragment>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
