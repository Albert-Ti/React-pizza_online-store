import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectFilter, setPagination } from '../redux/slices/filterSlice'
import styles from './pagination.module.scss'
import { useLocation } from 'react-router-dom'

const Pagination = () => {
  const { pagination } = useSelector(selectFilter)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/' && (
        <ul className={styles.lists}>
          {pagination.allPages.map((step, i) => (
            <li
              key={i}
              className={pagination.page === i + 1 ? `${styles.active}` : ''}
              onClick={() => dispatch(setPagination({ ...pagination, page: i + 1 }))}
            >
              {step}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Pagination
