import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setBase } from '../redux/reducers/products'

const Header = () => {
  const selected = useSelector((s) => s.products.selected)
  const totalCount = Object.values(selected).reduce((acc, rec) => acc + rec, 0)
  const dispatch = useDispatch()
  return (
    <div>
      <header className="flex justify-between items-center px-5 bg-black py-6 text-white">
        <div className="flex items-center">
          <Link to="/" classname="text-4xl">
            Ecommerse
          </Link>
          <div className="text-black ml-8">
            <button
              type="button"
              className="bg-white rounded px-6 py-3 mr-3"
              onClick={() => dispatch(setBase('USD'))}
            >
              USD
            </button>
            <button
              type="button"
              className="bg-white rounded px-6 py-3 mr-3"
              onClick={() => dispatch(setBase('EUR'))}
            >
              EUR
            </button>
            <button
              type="button"
              className="bg-white rounded px-6 py-3 mr-3"
              onClick={() => dispatch(setBase('CAD'))}
            >
              CAD
            </button>
          </div>
        </div>
        <nav>
          <Link to="/" className="mr-3">
            Home
          </Link>
          <Link to="/basket" className="mr-3">
            Card({totalCount})
          </Link>
          <Link to="/logs" className="mr-3">
            Logs
          </Link>
        </nav>
      </header>
    </div>
  )
}

export default Header
