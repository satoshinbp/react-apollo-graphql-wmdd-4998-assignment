import React from 'react'
import { List } from 'antd'
import Car from '../listItems/Car'
import { useQuery } from '@apollo/client'
import { GET_CARS_BY_PERSON_ID } from '../../queries/cars'

const Cars = props => {
  const { data, loading, error } = useQuery(GET_CARS_BY_PERSON_ID, { variables: { personId: props.personId } })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }}>
      {data.cars.map(({ id, year, model, make, price }) => (
        <List.Item key={id}>
          <Car key={id} id={id} year={year} model={model} make={make} price={price} personId={props.personId} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
