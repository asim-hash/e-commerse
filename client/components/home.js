import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import Catalog from './catalog'
import Header from './header'
// eslint-disable-next-line import/named
import { getCatalog, getLogs, getRates } from '../redux/reducers/products'
import Carts from './carts'
import Logs from './logs'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCatalog())
    dispatch(getRates())
    dispatch(getLogs())
  }, [])
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <Route exact path="/" component={() => <Catalog />} />
        <Route exact path="/basket" component={() => <Carts />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
