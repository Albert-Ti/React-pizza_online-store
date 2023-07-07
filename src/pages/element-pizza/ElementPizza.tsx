import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './ElementPizza.module.scss'

const ElementPizza: React.FC = () => {
  const [item, setItem] = React.useState<{
    imageUrl: string
    name: string
    price: number
  }>()

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
        console.log('Ошибка запроса ', error)
        navigate('/') // вернет на главную страницу
      }
    }
    fetchItem()
  }, [])

  if (!item) {
    return <>'Загрузка...'</>
  }

  return (
    <div className={styles.wrapper}>
      <img src={item.imageUrl} alt={item.name} />
      <h2>{item.name}</h2>
      <p>цена {item.price} ₽</p>
    </div>
  )
}

export default ElementPizza
