import { gql } from '@apollo/client'

export const GET_CARS = gql`
  query GetCars($personId: String) {
    cars(personId: $personId) {
      id
      year
      make
      model
      price
    }
  }
`

export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
