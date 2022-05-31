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

export default function LineChartCard({
  type,
  title,
  subtitle,
  api,
  series_key_1,
  series_key_2,
  primaryDataKey,
  data_formatter
}) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() => {
    api(type).then((res) => {
      const d = data_formatter ? data_formatter(res) : res

      setData(d)

      setLoading(false)
    })
  }, [])
  return (
    <Card loading={loading}>
      {!loading ? (
        <div>
          <div>
            <h2>{title}</h2>
            <h5>{subtitle}</h5>
          </div>
          <div>
            {' '}
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart width={200} height={50} data={data}>
                <XAxis dataKey={primaryDataKey || 'name'} />
                <Line
                  type='monotone'
                  dataKey={series_key_1}
                  stroke='green'
                  strokeWidth={1}
                  dot={false}
                />
                {series_key_2 ? (
                  <Line
                    type='monotone'
                    dataKey={series_key_2}
                    stroke='red'
                    strokeWidth={1}
                    dot={false}
                  />
                ) : null}
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
