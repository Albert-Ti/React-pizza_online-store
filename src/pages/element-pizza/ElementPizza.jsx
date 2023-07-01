import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './ElementPizza.module.css'
const typePizza = ['тонкое', 'традиционная']

const ElementPizza = () => {
  const [{ name, imageUrl, price, sizes, types }, setItem] = React.useState({})

  const navigate = useNavigate()
  const { id } = useParams()

  React.useEffect(() => {
    // fetch(`https://648a12a25fa58521cab0be8c.mockapi.io/items?${id}`)
    //   .then(res => res.json())
    //   .then(item => setItem(...item))
    async function fetchItem() {
      try {
        const { data } = await axios.get('https://648a12a25fa58521cab0be8c.mockapi.io/items/' + id)
        setItem(data)
      } catch (error) {
        alert('Произошла ошибка')
        console.log('Ошибка запроса ', error.message)
        navigate('/') // вернет на главную страницу
      }
    }
    fetchItem()
  }, [])

  if (!imageUrl) {
    return 'Загрузка...'
  }

  return (
    <div className={styles.wrapper}>
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>
        Пицца {typePizza[types[1]]}, размер {sizes[1]}, цена {price} ₽
      </p>
    </div>
  )
}

export default ElementPizza
