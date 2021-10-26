import React from 'react'
import { List } from 'antd'
import Contact from '../listItems/Contact'
import { useQuery } from '@apollo/client'
import { GET_CONTACTS } from '../../queries/contacts'

const Contacts = () => {
  const { data, loading, error } = useQuery(GET_CONTACTS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }}>
      {data.contacts.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Contact key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default Contacts
