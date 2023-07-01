import qs from 'qs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../../components/Cotegories'
import Sort, { sortListsValue } from '../../components/Sort'
import PizzaBlock from '../../components/pizza-block/PizzaBlock'
import Sceleton from '../../components/pizza-block/Sceleton'
import { fetchPizzas, selectPizzas } from '../../components/redux/slices/fetchPizzas'
import { selectFilter, setCategoryId, setFilters } from '../../components/redux/slices/filterSlice'
import styles from './home.module.scss'
import Pagination from '../../components/pagination/pagination'

const Home = () => {
  const isFetch = React.useRef(false)
  const isMounted = React.useRef(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { items, status } = useSelector(selectPizzas)
  const { searchValue, categoryId, sort, pagination } = useSelector(selectFilter)

  const getPizzas = async () => {
    const sortBy = sort.type.replace('-', '')
    const order = sort.type.includes('-') ? 'desc' : 'asc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const url = 'https://648a12a25fa58521cab0be8c.mockapi.io/items'

    dispatch(
      fetchPizzas({
        url,
        category,
        sortBy,
        order,
        pagination
      })
    )
  }

  // Вшиваем параметры в адрусную строку
  React.useEffect(() => {
    // чтобы при первом рендере url-params не вшивались в адресную строку мы создаем условие в котором после рендера isMounted будет false, и далее уже изменим на true, а потом при изменения deps(зависимостей) в usEffect будем вшиватсья в адресную строку url-params, так как useEffect после первого рендера все равно выполнится даже если имеет определенные зависимости.
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage: pagination.page,
        categoryId,
        sortType: sort.type
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sort.type, pagination.page])

  // После первого рендера, проверяем url-params и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const { categoryId, sortType, currentPage } = qs.parse(window.location.search.substring(1))

      const sortCorrect = sortListsValue.find(item => item.type === sortType)

      dispatch(
        setFilters({
          categoryId: categoryId,
          sort: sortCorrect,
          pagination: {
            ...pagination,
            page: currentPage
          }
        })
      )

      isFetch.current = true
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isFetch.current) {
      getPizzas()
    }
    isFetch.current = false
  }, [categoryId, sort.type, pagination.page])

  return (
    <>
      <div className='content__top'>
        <Categories onClickCategory={i => dispatch(setCategoryId(i))} categoryId={categoryId} />
        <Sort />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '40px 0px' }}>
        <h2 className='content__title'>Все пиццы</h2>
        <Pagination />
      </div>
      <div className={styles.items}>
        {status === 'error' && (
          <div className='content__error-info'>
            <h2>Произошла Ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить позже.</p>
          </div>
        )}
        {status === 'loading'
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : items
              .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map(item => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  )
}

export default Home

/* const [toggleCategoryId, setToggleCategoryId] = React.useState(0);
 const [toggleSortValue, setToggleSortValue] = React.useState({
   value: 'популярности',
   type: 'rating'
 }); */

/*  const setCategoryIdTwo = i => {
  return dispatch({ type: 'filters/setCategoryId', payload: i })
}
 */

/* fetch(`${url}?page=${pagination.page}&limit=${pagination.limit}&${category}&sortBy=${sortBy}&order=${order}`
)
  .then(res => res.json())
  .then(json => {
    setDataPizzas({
      ...data,
      items: json,
      isloading: false
    })
    getPages(10);
  }
  ).catch(err => console.log(err))
 */
