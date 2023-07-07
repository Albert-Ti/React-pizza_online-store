import React from 'react'

const cotegoryList: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

type CategoriesPropsType = {
  categoryId: number
  onClickCategory: (index: number) => void
}

const Categories: React.FC<CategoriesPropsType> = ({ onClickCategory, categoryId }) => {
  return (
    <div className='categories'>
      <ul>
        {cotegoryList.map((value, index) => (
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
}

export default Categories
