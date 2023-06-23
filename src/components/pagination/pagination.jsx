import React from 'react'
import styles from './pagination.module.scss';

const Pagination = ({ pages, pagination, setPagination }) => {

  return (
    <ul className={styles.lists}>
      {pages.map((item, i) => (
        <li
          key={i}
          className={pagination.page === i + 1 ? `${styles.active}` : ''}
          onClick={() => setPagination({ ...pagination, page: i + 1 })}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Pagination;