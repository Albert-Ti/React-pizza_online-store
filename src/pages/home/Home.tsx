import qs from 'qs'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../../components/Categories'
import SortPopup, { sortListsValue } from '../../components/SortPopup'
import Pagination from '../../components/pagination/Pagination'
import ListPizzas from '../../components/pizza-block/PizzaBlock'
import Sceleton from '../../components/pizza-block/Sceleton'
import { selectFilter } from '../../redux/filter/selectors'
import { setCategoryId, setFilters } from '../../redux/filter/slice'
import { Sort } from '../../redux/filter/types'
import { fetchPizzas } from '../../redux/pizza/actions'
import { selectPizzas } from '../../redux/pizza/selectors'
import { useAppDispatch } from '../../redux/store'
import styles from './Home.module.scss'

export const Home: React.FC = () => {
  const isFetch = React.useRef<boolean>(false)
  const isMounted = React.useRef<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.type, pagination.page])

  // После первого рендера, проверяем url-params и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const { categoryId, sortType, currentPage } = qs.parse(window.location.search.substring(1))
      const sortCorrect = sortListsValue.find(item => item.type === sortType) as Sort
      dispatch(
        setFilters({
          categoryId: Number(categoryId),
          sort: sortCorrect,
          pagination: {
            ...pagination,
            page: Number(currentPage)
          }
        })
      )

      isFetch.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
    isFetch.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.type, pagination.page])

  const handleChangeCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i))
  }, [])

  return (
    <>
      <div className='content__top'>
        <Categories onClickCategory={handleChangeCategory} categoryId={categoryId} />
        <SortPopup sort={sort} />
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
              .map(item => <ListPizzas key={item.id} {...item} />)}
      </div>
    </>
  )
}
