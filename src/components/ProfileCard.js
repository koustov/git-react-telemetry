import React, { useEffect, useState } from 'react';
import { request } from "../stat-service"
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer  } from 'recharts';
import './Card.css';

export default function ProfileCard({type, title, subtitle, config, formatter, node, series_key_1, series_key_2, colspan}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    request(type, config, node, formatter).then(res => {
        // console.log(res)
        setData(res && Array.isArray(res) ? res : [])
        // console.log('111111')
        setLoading(false)
    })
}, [config])
    return(
      <React.Fragment>
        {
          !loading ? (<div className="card profile-card" style={{gridColumn : `1/${colspan}`}}>
          <div><h2>{title}<small>({data.length})</small></h2>
      </div>
      <div className="profiles">
    
      {
        data.map((sg, sgi) => {
          return <a href={`https://github.com/${sg.login}`} target="_blank" className="profiles__group" key={sgi}>
            <img src={sg.avatar_url} alt={sg.login}/>
            <p>{sg.login}</p>
          </a>
        })
      }
        </div>
      </div>): null
        }
      </React.Fragment>
      
    )
};