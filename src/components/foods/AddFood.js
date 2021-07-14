import React from 'react'
import CreatableSelect from 'react-select/creatable';
import { useEffect } from 'react'
import { connect } from 'react-redux';
import { getFoods } from '../../actions/food'
import { addToUserFoods, deleteUserFood } from '../../actions/food'
import { makeAvailableList, createItems, deleteItems } from '../../helpers/listHelpers'

const AddFood = (props) => {
  let userFoods = []
  if(props.userProfile.foods !== undefined){
    userFoods = props.userProfile.foods
  }  
  const { userProfile } = props;
  const {foodsList} = props;
  const {getFoods} = props;
  const { addToUserFoods } = props;
  const { deleteUserFood } = props;
  
  //[X] I want to display foods list minus any the user has already associated to them
  //[X] I want to add a selected food to the user
  //[X] when the server responds to the add request, I'll receive an array that includes foods added to the user along with another array that contains food added to the foods database
  //[X] the action to add a users food will necessarily update the redux store for foods associated with the user and update the local list of all foods available on in the database

  const onChange = (newValue) => {
    const createList = createItems(newValue, userFoods)
    if(createList.length > 0){
      const packet = {
        userId: userProfile.id,
        foods: createItems(newValue, userFoods)
      }
      addToUserFoods(packet);
    }

    const deleteList = deleteItems(newValue, userFoods)
    if(deleteList.length > 0 && createList.length === 0){
      const deletePacket = {
        userId: userProfile.id,
        ids: deleteList.join(",")
      }
      deleteUserFood(deletePacket)
    }    
  }

  const { foodsLoaded } = props
  useEffect(() => {
    foodsLoaded === false && getFoods();
  })
  
  return (
    <div>
      <h4>Foods you like</h4>
      <CreatableSelect         
        isMulti
        options={makeAvailableList(foodsList, userFoods)}
        onChange={onChange}
        value={makeAvailableList(userFoods, [])}
      />
    </div>
  )
}

export default connect(state => {
  return {
    foodsLoaded: state.foodsState.foodsLoaded,
    foodsList: state.foodsState.foods,    
    userProfile: state.usersState.userProfile
  }
}, { getFoods, addToUserFoods, deleteUserFood })(AddFood);
