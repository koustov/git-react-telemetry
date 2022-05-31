import React, { useEffect, useState } from 'react';
// import { request } from "../stat-service"
import './Card.css';


export default function StatisticsCard({type, title, subtitle, api}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(0);
  useEffect(() => {
    api(type).then(res => {
        setData(res && Array.isArray(res) ? res.length : 0)
        setLoading(false)
    })
}, [])
  
    return(
      <div className="card card-stat" >
          <div><h2>{title}</h2>
      <h5>{subtitle}</h5></div>
      <div><h1>{data || 0}</h1></div>
      
      
      {/* <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt=""/> */}
    </div>
    )
};