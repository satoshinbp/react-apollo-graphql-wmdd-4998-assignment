import { gql } from 'apollo-server-express'
import { find, remove, filter } from 'lodash'
import cars from '../mocks/cars'

const typeDefs = gql`
  type Car {
    id: String!
    year: Int!
    model: String!
    make: String!
    price: Float!
    personId: String!
  }

  type Query {
    car(id: String!): Car
    cars(personId: String): [Car]
  }

  type Mutation {
    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    removeCar(id: String!): Car
  }
`

const resolvers = {
  Query: {
    car: (parent, args, context, info) => find(cars, { id: args.id }),
    cars: (parent, args, context, info) => (args.personId ? filter(cars, { personId: args.personId }) : cars),
  },
  Mutation: {
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      }
      cars.push(newCar)
      return newCar
    },
    updateCar: (root, args) => {
      const updatedCar = find(cars, { id: args.id })
      if (!updatedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      updatedCar.year = args.year
      updatedCar.make = args.make
      updatedCar.model = args.model
      updatedCar.price = args.price
      updatedCar.personId = args.personId
      return updatedCar
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      remove(cars, car => car.id === removedCar.id)
      return removedCar
    },
  },
}

export { typeDefs, resolvers }
