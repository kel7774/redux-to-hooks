import React, { useContext } from 'react'
import { ProductsContext } from '../context/products-context'
import { useStore } from '../hooks-store/stores'
import ProductItem from '../components/Products/ProductItem'
import './Products.css'

const Products = props => {
  const state = useStore()0
  const productList = useContext(ProductsContext).products
  return (
    <ul className='products-list'>
      {productList.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  )
}

export default Products
