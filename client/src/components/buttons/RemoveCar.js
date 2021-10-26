import React from 'react'
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../queries/cars'

const RemoveCar = ({ id, year, make, model, price, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({
        query: GET_CARS,
        variables: { personId },
      })
      cache.writeQuery({
        query: GET_CARS,
        data: { cars: filter(cars, car => car.id !== removeCar.id) },
        variables: { personId },
      })
    },
  })

  const handleButtonClick = () => {
    const result = window.confirm('Are you sure you want to delete this car?')

    if (result) {
      removeCar({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          removeCar: {
            __typename: 'Car',
            id,
            year,
            make,
            model,
            price,
            personId,
          },
        },
      })
    }
  }

  return <DeleteOutlined key="delete" onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveCar
