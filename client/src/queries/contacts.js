import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      firstName
      lastName
    }
  }
`

export const GET_CONTACT_WITH_CARS = gql`
  query GetContactWithCars($id: String!) {
    contact(id: $id) {
      id
      firstName
      lastName
    }

    cars(personId: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const ADD_CONTACT = gql`
  mutation AddContact($id: String!, $firstName: String!, $lastName: String!) {
    addContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: String!, $firstName: String!, $lastName: String!) {
    updateContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($id: String!) {
    removeContact(id: $id) {
      id
      firstName
      lastName
    }

    removeCars(personId: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
