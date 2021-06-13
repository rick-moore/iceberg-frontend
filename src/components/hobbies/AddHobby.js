import React from 'react'
import { useState } from 'react'
import CreatableSelect from 'react-select/creatable';

export default function AddHobby({ hobbiesList, addHobby }) {
  const searchList = hobbiesList.map(
    (hobby) => {
      return {
        value: hobby.id,
        label: hobby.name
      }
    }
  )
  
  const test = (e) => {
    addHobby(e.label);
  }
  return (
    <div>
      <h4>AddHobby</h4>
      <CreatableSelect 
        options={searchList}
        onChange={(e) => test(e)}
      />
    </div>
  )
}