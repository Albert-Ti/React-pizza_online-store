import React from "react";

const cotegoryList = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCotegory = index => {
    setActiveIndex(index)
  }


  return (
    <div className="categories">
      <ul>
        {cotegoryList.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCotegory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;