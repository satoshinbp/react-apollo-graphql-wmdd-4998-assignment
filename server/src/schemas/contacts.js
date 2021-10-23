import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'
import contacts from '../mocks/contacts'

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String!, lastName: String!): Contact
    removeContact(id: String!): Contact
  }
`

const resolvers = {
  Query: {
    contact: (parent, args, context, info) => find(contacts, { id: args.id }),
    contacts: () => contacts,
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      }
      contacts.push(newContact)
      return newContact
    },
    updateContact: (root, args) => {
      const updatedContact = find(contacts, { id: args.id })
      if (!updatedContact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }
      updatedContact.firstName = args.firstName
      updatedContact.lastName = args.lastName
      return updatedContact
    },
    removeContact: (root, args) => {
      const removedContact = find(contacts, { id: args.id })
      if (!removedContact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }
      remove(contacts, contact => contact.id === removedContact.id)
      return removedContact
    },
  },
}

export { typeDefs, resolvers }
