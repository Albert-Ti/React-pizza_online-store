import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { selectFilter, setPagination } from '../redux/slices/filterSlice'
import styles from './pagination.module.scss'

const Pagination: React.FC = () => {
  const { pagination } = useSelector(selectFilter)
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/' && (
        <ul className={styles.lists}>
          {pagination.allPages.map((step: number, i: number) => (
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
