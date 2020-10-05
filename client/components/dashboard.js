import React from 'react'
import Head from './head'

const Dashboard = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-yellow-400  font-bold rounded-lg border shadow-lg p-10">
          DASHBOARD component
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}

export default React.memo(Dashboard)
