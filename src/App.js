import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Cotegories';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';


function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://648a12a25fa58521cab0be8c.mockapi.io/items')
      .then(res => res.json())
      .then(setItems)
      .catch(err => alert('Произошла ошибка при загрузке данных с сервера!'))
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(item => (
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
