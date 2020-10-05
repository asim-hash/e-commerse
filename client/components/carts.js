import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/reducers/products'

const Carts = () => {
  const selected = useSelector((s) => s.products.selected)
  const catalog = useSelector((s) => s.products.catalog)
  const cart = catalog.filter((el) => Object.keys(selected).includes(el.id))
  const total = cart.reduce((acc, rec) => acc + rec.price * selected[rec.id], 0)
  const base = useSelector((s) => s.products.base)
  const dispatch = useDispatch()
  const rates = useSelector((s) => s.products.rates)
  const valuteSymbols = {
    USD: '$',
    CAD: 'C$',
    EUR: '€'
  }
  return (
    <div>
      <div className="bg-green-200 py-3 px-4 flex mb-3">
        <div className="w-1/3">NAME</div>
        <div className="w-1/3">TOTAL</div>
        <div className="w-1/3">COST</div>
      </div>
      {cart.map((product) => (
        <div key={product.id} className="bg-green-200 py-3 px-4 flex mb-3">
          <div className="w-1/3">{product.title}</div>
          <div className="w-1/3">
            <div className="cart-btn my-6">
              <button type="button" onClick={() => dispatch(addToCart(product.title))}>
                +
              </button>
              <span className="mx-4">{selected[product.id] || 0}</span>
              <button type="button" onClick={() => dispatch(removeFromCart(product.id))}>
                -
              </button>
            </div>
          </div>
          <div className="w-1/3">
            {(product.price * selected[product.id] * (rates[base] || 1)).toFixed(2)}{' '}
            {valuteSymbols[base]}
          </div>
        </div>
      ))}
      <div className="text-right">
        total:{(total * (rates[base] || 1)).toFixed(2)} {valuteSymbols[base]}
      </div>
    </div>
  )
}

export default Carts
