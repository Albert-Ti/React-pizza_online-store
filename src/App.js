import React from 'react';
import { Routes, Route } from "react-router-dom";

import './scss/app.scss';
import Home from './pages/home/Home';
import Header from './components/Header';
import NotFound from './pages/not-found/NotFound';
import Cart from './pages/Cart';
import Pagination from './components/pagination/pagination';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [pagination, setPagination] = React.useState({ page: 1, limit: 4, allPages: [] });

  const getPages = pages => {
    let result = [];
    for (let i = 0; i < Math.ceil(pages / pagination.limit); i++) {
      result.push(i + 1)
    }
    setPagination({
      ...pagination,
      allPages: result
    });
  }

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route element={<Home searchValue={searchValue} pagination={pagination} getPages={getPages} />} path='/' />
            <Route element={<Cart />} path='/cart' />
            <Route element={<NotFound />} path='*' />
          </Routes>
        </div>
        <Pagination pages={pagination.allPages} pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
}
export default App;
