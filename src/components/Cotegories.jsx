import React from "react";

const cotegoryList = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

function Categories({ onClickCategory, categoryId }) {


  return (
    <div className="categories">
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

export default Categories;