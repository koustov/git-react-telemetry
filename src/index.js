import React, {Fragment, useEffect} from 'react'
import './index.css'
import Card  from './components/Card.js';
import { get_card } from './components/Cards';
import {get_cards} from './stat-service';

export const GitStat = ({ accessToken, types, user, repo, columns=4, bgimage, bgcolor}) => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
// console.error(JSON.stringify(styles))
  return (
    <div className="card-grid" style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, backgroundImage: bgimage ,background: bgcolor}}>
    {types.map((t, ti) => {
      return <React.Fragment key={ti} >
        {get_card(t, user, repo, columns, accessToken)}
      </React.Fragment>
    })}
    </div>
  )
}
