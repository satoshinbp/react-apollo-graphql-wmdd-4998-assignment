import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'
import cars from '../mocks/cars'

const typeDefs = gql`
  type Car {
    id: String!
    year: Int!
    model: String!
    make: String!
    price: Float
    personId: String
  }

  type Query {
    car(id: String!): Car
    cars: [Car]
  }

  type Mutation {
    addCar(id: String!, year: String!, model: String!, make: String!, price: String, personId: String): Car
    updateCar(id: String!, year: String, model: String, make: String, price: String, personId: String): Car
    removeCar(id: String!): Car
  }
`

const resolvers = {
  Query: {
    car: (parent, args, context, info) => find(cars, { id: args.id }),
    cars: () => cars,
  },
  Mutation: {
    addCar: (root, args) => {
      const newCar = args
      cars.push(newCar)
      return newCar
    },
    updateCar: (root, args) => {
      const carToUpdate = find(cars, { id: args.id })
      if (!carToUpdate) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      const updatedCar = { ...carToUpdate, args }
      return updatedCar
    },
    removeCar: (root, args) => {
      const carToRemove = find(cars, { id: args.id })
      if (!carToRemove) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      remove(cars, car => car.id === carToRemove.id)
      return carToRemove
    },
  },
}

export { typeDefs, resolvers }
