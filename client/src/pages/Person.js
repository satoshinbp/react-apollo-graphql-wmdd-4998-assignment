import React from 'react'
import { useParams } from 'react-router-dom'
import Contact from '../components/listItems/'
import { GET_CARS_BY_PERSON_ID } from '../queries/cars'

const Person = () => {
  const { id } = useParams()

  return <div>{id}</div>
}

export default Person
