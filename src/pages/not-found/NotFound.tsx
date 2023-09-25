import React from 'react'
import styles from './notfound.module.scss'

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует на нашем интернет-магазине
      </p>
    </div>
  )
}

export default NotFound
