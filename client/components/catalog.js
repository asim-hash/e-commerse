import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/reducers/products'

const Catalog = () => {
  const dispatch = useDispatch()
  const catalog = useSelector((s) => s.products.catalog)
  const selected = useSelector((s) => s.products.selected)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const valuteSymbols = {
    USD: '$',
    CAD: 'C$',
    EUR: '€'
  }
  return (
    <div className="flex flex-wrap p-10 -mx-4 ">
      {catalog.map((product) => (
        <div key={product.id} className="w-1/4 px-4">
          <div className="text-center m-2  border border-solid border-2 border-black p-2">
            <img src={product.image} alt="" className="h-40 object-contain" />
            <h2>{product.title}</h2>
            <p>
              price:{(product.price * (rates[base] || 1)).toFixed(2)} {valuteSymbols[base]}
            </p>
            <div className="cart-btn my-6">
              <button type="button" onClick={() => dispatch(addToCart(product.id))}>
                +
              </button>
              <span className="mx-4">{selected[product.id] || 0}</span>
              <button type="button" onClick={() => dispatch(removeFromCart(product.id))}>
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Catalog
