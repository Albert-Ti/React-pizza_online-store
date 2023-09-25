import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Cart from './pages/Cart'
import PizzaDietails from './pages/pizza-dietails/PizzaDietails'
import { Home } from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import './scss/app.scss'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Cart />} path='/cart' />
            <Route element={<PizzaDietails />} path='/pizza/:id' />
            <Route element={<NotFound />} path='*' />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App
