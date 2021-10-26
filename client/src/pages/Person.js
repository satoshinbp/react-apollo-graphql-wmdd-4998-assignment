import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, List } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_WITH_CARS } from '../queries/contacts'

const Person = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_CONTACT_WITH_CARS, {
    variables: { id },
  })
  const contact = data?.contact
  const cars = data?.cars

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <>
      <Link to="/">Go back home</Link>
      <Card title={`${contact.firstName} ${contact.lastName}`} style={{ width: '500px', marginTop: '24px' }}>
        <List grid={{ gutter: 20, column: 1 }}>
          {cars.map(({ id, year, model, make, price }) => (
            <List.Item key={id}>
              <Card type="inner">
                <List grid={{ gutter: 20, column: 1 }}>
                  <List.Item>Year: {year}</List.Item>
                  <List.Item>Model: {model}</List.Item>
                  <List.Item>Make: {make}</List.Item>
                  <List.Item>Price: ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</List.Item>
                </List>
              </Card>
            </List.Item>
          ))}
        </List>
      </Card>
    </>
  )
}

export default Person
