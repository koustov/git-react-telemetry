import React, { useEffect, useState } from 'react';
import { request } from "../stat-service"
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer  } from 'recharts';
import './Card.css';

export default function LineCard({type, title, subtitle, user, repo, formatter, node, series_key_1, series_key_2}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    request(type, user, repo, node, formatter).then(res => {
      //  const d = node ? res[node] : res 
      //  const d_u = formatter(d)
        setData(res)
        console.log('111111')
        // console.log(d_u)
        console.log(series_key_1)
        setLoading(false)
    })
}, [user, repo])
    return(
      <div className="box red">
      <h2>{title}</h2>
      <h5>{subtitle}</h5>
      <ResponsiveContainer width="100%" height="40%">
      <LineChart width={200} height={50} data={data}>

    <Line type="monotone"  dataKey={series_key_1}  stroke="green" strokeWidth={1} dot={false}  />
    {
      series_key_2 ? (
        <Line type="monotone" dataKey={series_key_2} stroke="red" strokeWidth={1} dot={false} />
      ) : null
    }
    <Tooltip />
  </LineChart></ResponsiveContainer>
  </div>
    )
};