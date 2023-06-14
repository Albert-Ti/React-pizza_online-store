import './scss/app.scss'
import Header from './components/Header';
import Categories from './components/Cotegories';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
import React from 'react';
import dataPizzas from './pizzas.json';


function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              dataPizzas.map(item => (
                <PizzaCard
                  key={item.id}
                  {...item}
                />
              )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
