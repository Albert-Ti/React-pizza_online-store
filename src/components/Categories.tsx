import React from 'react'

const categoryList: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesProps = {
  categoryId: number
  onClickCategory: (index: number) => void // если функция не возвращает какое-то значение то прописываем void - что значит пустота
}

const Categories: React.FC<CategoriesProps> = React.memo(({categoryId, onClickCategory}) => {
  return (
    <div className="categories">
      <ul>
        {categoryList.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories
