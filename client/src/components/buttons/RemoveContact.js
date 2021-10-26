import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../queries/contacts'

const RemoveContact = ({ id, firstName, lastName }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    update(cache, { data: { removeContact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS })
      cache.writeQuery({
        query: GET_CONTACTS,
        data: { contacts: filter(contacts, contact => contact.id !== removeContact.id) },
      })
    },
  })

  const handleButtonClick = () => {
    const result = window.confirm('Are you sure you want to delete this contact?')

    if (result) {
      removeContact({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          removeContact: {
            __typename: 'Contact',
            id,
            firstName,
            lastName,
          },
          removeCars: {
            __typename: 'Car',
            id: 'temp-id',
            year: 'temp-year',
            make: 'temp-make',
            model: 'temp-model',
            price: 'temp-price',
            personId: id,
          },
        },
      })
    }
  }

  return <DeleteOutlined key="delete" onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveContact
