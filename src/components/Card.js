import React, { useEffect, useState } from 'react'
import './Card.css'

export default function Card({ loading, children }) {
  return (
    <div className='card'>
      {loading ? (
        <div className='loader'>
          <div className='ball'></div>
          <div className='ball'></div>
          <div className='ball'></div>
        </div>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </div>
  )
}
