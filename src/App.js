import create from 'zustand'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const useStore = create(set => ({
  products: [
    { id: 1, name: 'Pantolon', price: 299.99 },
    { id: 2, name: 'Ceket', price: 99.99 },
    { id: 3, name: 'Ayakakbı', price: 199.99 }
  ],
  cart: [],
  updateCart: val => set({ cart: val })
}))

function Products () {
  let updateCart = useStore(state => state.updateCart)
  let cartItems = useStore(state => state.cart)
  let products = useStore(state => state.products).map(product => (
    <li>
      {product.name} - {product.price} TL
      <button onClick={() => addItemToCart(product, updateCart, cartItems)}>
        Sepete Ekle
      </button>
    </li>
  ))
  return (
    <div>
      <h1>Ürünler</h1>
      <ul>{products}</ul>
    </div>
  )
}

function addItemToCart (product, updateCart, cartItems) {
  let index = cartItems.findIndex(item => item.id === product.id)
  if (index === -1) {
    product.count = 1
    updateCart([...cartItems, product])
  } else {
    let clone = cartItems
    clone[index].count++
    updateCart([...clone])
  }
}

function removeItemFromCart (product, updateCart, cartItems) {
  let index = cartItems.findIndex(item => item.id === product.id)
  let clone = cartItems
  clone.splice(index, 1)
  updateCart([...clone])
}

function Cart () {
  let updateCart = useStore(state => state.updateCart)
  let cartItems = useStore(state => state.cart)
  let totalPrice = cartItems
    .map(product => product.price * product.count)
    .reduce((x, y) => x + y, 0)
    .toFixed(2)
  let cart = cartItems.map(product => (
    <li>
      {product.name} - Adet: {product.count} - {product.price} TL
      <button
        onClick={() => removeItemFromCart(product, updateCart, cartItems)}
      >
        Sepetten Çıkar
      </button>
    </li>
  ))
  return (
    <div>
      <h1>Sepetim ({totalPrice} TL)</h1>
      <ul> {cart} </ul>
    </div>
  )
}

function App () {
  return (
    <div className='App'>
      <Products />
      <Cart />
    </div>
  )
}
export default App
