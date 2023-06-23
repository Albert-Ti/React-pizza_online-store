import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../components/redux/filterSlice';

import Categories from '../../components/Cotegories';
import Sort from '../../components/Sort';
import PizzaCard from '../../components/pizza-card/PizzaCard';
import Sceleton from '../../components/pizza-card/Sceleton';
import styles from './home.module.scss';


const Home = ({ searchValue, pagination, getPages }) => {

  const [data, setData] = React.useState({ isloading: true, items: [] });

  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector(state => state.filter);

  React.useEffect(() => {
    setData({ ...data, isloading: true });

    const sortBy = sort.type.replace('-', '');
    const order = sort.type.includes('-') ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const url = 'https://648a12a25fa58521cab0be8c.mockapi.io/items';

    fetch(`${url}?page=${pagination.page}&limit=${pagination.limit}&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then(res => res.json())
      .then(json => {
        setData({
          ...data,
          items: json,
          isloading: false
        })
        getPages(10);
      }
      ).catch(err => console.log(err))

    window.scrollTo(0, 0);
  }, [categoryId, sort, pagination.page]);

  return (
    <>
      <div className="content__top">
        <Categories
          onClickCategory={i => dispatch(setCategoryId(i))}
          categoryId={categoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className={styles.items}>

        {
          data.isloading
            ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)

            : data.items
              .filter(item => (
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              ))
              .map(item => (
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



/* const [toggleCategoryId, setToggleCategoryId] = React.useState(0);
 const [toggleSortValue, setToggleSortValue] = React.useState({
   value: 'популярности',
   type: 'rating'
 }); */


/*  const setCategoryIdTwo = i => {
  return dispatch({ type: 'filters/setCategoryId', payload: i })
}
 */