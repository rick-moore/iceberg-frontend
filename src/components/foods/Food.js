import React from 'react'
import DeleteButton from './DeleteButton'

const Food = ({ food, deleteFood }) => {
  const onDelete = (e) => {
    deleteFood(e.target.id)
  }
  return (
    <div>
      <h3>
        {food.name} <DeleteButton id={food.id} deleteFood={onDelete}/>
      </h3>
    </div>
  )
}
export default Food;