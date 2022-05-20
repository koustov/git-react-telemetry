import React, { useEffect, useState } from 'react';
import { request } from "../stat-service"
import './Card.css';
import LineCard from './LineCard';


export default function StatCard({type, title, subtitle, user, repo}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(0);
  useEffect(() => {
    request(type, user, repo).then(res => {
        setData(res.length)
        // console.log('zzz')
        // console.log(res)
        setLoading(false)
    })
}, [user, repo])
  
    return(
      <div className="box red">
      <h2>{title}</h2>
      <h5>{subtitle}</h5>
      <h1>{data || 0}</h1>
      {/* <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt=""/> */}
    </div>
    )
};