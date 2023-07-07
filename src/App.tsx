import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './scss/app.scss'
import Home from './pages/home/Home'
import Header from './components/Header'
import NotFound from './pages/not-found/NotFound'
import Cart from './pages/Cart'
import ElementPizza from './pages/element-pizza/ElementPizza'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Cart />} path='/cart' />
            <Route element={<ElementPizza />} path='/pizza/:id' />
            <Route element={<NotFound />} path='*' />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App
