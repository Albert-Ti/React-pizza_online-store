import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

import {setPagination} from '../../redux/filter/slice'
import styles from './Pagination.module.scss'
import {selectPagination} from '../../redux/filter/selectors'

const Pagination: React.FC = () => {
  const pagination = useSelector(selectPagination)
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  return (
    <>
      {pathname === '/' && (
        <ul className={styles.lists}>
          <li onClick={() => dispatch(setPagination({type: 'back', page: 0}))}>◄</li>
          {pagination.allPages.map((step: number, i: number) => (
            <li
              key={i}
              className={pagination.page === i + 1 ? `${styles.active}` : ''}
              onClick={() => dispatch(setPagination({type: 'default', page: i + 1}))}
            >
              {step}
            </li>
          ))}
          <li onClick={() => dispatch(setPagination({type: 'go', page: 0}))}>►</li>
        </ul>
      )}
    </>
  )
}

export default Pagination
