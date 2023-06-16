import React from 'react'

import Categories from '../../../components/Cotegories';
import Sort from '../../../components/Sort';
import PizzaCard from '../../../components/pizza-card/PizzaCard';
import Sceleton from '../../../components/pizza-card/Sceleton';
import styles from './home.module.scss';

const Home = () => {
  const [data, setData] = React.useState({
    isloading: true,
    items: []
  });

  React.useEffect(() => {
    fetch('https://648a12a25fa58521cab0be8c.mockapi.io/items')
      .then(res => res.json())
      .then(json => setData({
        ...data,
        items: json,
        isloading: false
      })
      )
      .catch(err => alert('Произошла ошибка при загрузке данных с сервера!'))

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className={styles.items}>
        {
          data.isloading
            ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)

            : data.items.map(item => (
              <PizzaCard
                key={item.id}
                {...item}
              />))
        }
      </div>
    </>
  )
}

export default Home;