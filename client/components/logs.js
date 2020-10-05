import React from 'react'
import { useSelector } from 'react-redux'

const Logs = () => {
  const logs = useSelector((s) => s.logs.logs)
  return (
    <div>
      {logs.map((el) => (
        <div key={el.time} className="flex">
          <div>{el.time}</div>
          <div >{el.event}</div>
        </div>
      ))}
    </div>
  )
}

export default Logs
