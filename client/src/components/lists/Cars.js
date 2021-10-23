import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import Car from '../listItems/Car'
import { GET_CARS } from '../queries/cars'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const Cars = () => {
  const styles = getStyles()

  const { data, loading, error } = useQuery(GET_CARS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.cars.map(({ id, year, model, make, price, personId }) => (
        <List.Item key={id}>
          <Car key={id} id={id} year={year} model={model} make={make} price={price} personId={personId} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
