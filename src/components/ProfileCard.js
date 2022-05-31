import React, { useEffect, useState } from 'react'
// import { request } from "../stat-service"
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import Card from './Card'
import './Card.css'

export default function ProfileCard({
  type,
  title,
  api,
  colspan,
  data_formatter
}) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() => {
    api(type).then((res) => {
      const data = res && Array.isArray(res) ? res : []
      const d = data_formatter ? data_formatter(data) : data
      setData(d)
      setLoading(false)
    })
  }, [])
  return (
    <Card loading={loading}>
      {!loading ? (
        <div
          className='card profile-card'
          style={{ gridColumn: `1/${colspan}` }}
        >
          <div>
            <h2>
              {title}
              <small>({data.length})</small>
            </h2>
          </div>
          <div className='profiles'>
            {data.map((sg, sgi) => {
              return (
                <a
                  href={`https://github.com/${sg.login}`}
                  target='_blank'
                  className='profiles__group'
                  key={sgi}
                >
                  <img src={sg.avatar_url} alt={sg.login} />
                  <p>{sg.login}</p>
                </a>
              )
            })}
          </div>
        </div>
      ) : null}
    </Card>
  )
}
