import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CONTACT, GET_CONTACTS } from '../../queries/contacts'

const AddContact = () => {
  const [form] = Form.useForm()

  const [addContact] = useMutation(ADD_CONTACT)

  const [, forceUpdate] = useState()
  useEffect(() => forceUpdate({}), [])

  const onFinish = values => {
    const { firstName, lastName } = values
    const id = uuidv4()

    addContact({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addContact: {
          __typename: 'Contact',
          id,
          firstName,
          lastName,
        },
      },
      update: (cache, { data: { addContact } }) => {
        const data = cache.readQuery({ query: GET_CONTACTS })
        cache.writeQuery({
          query: GET_CONTACTS,
          data: {
            ...data,
            contacts: [...data.contacts, addContact],
          },
        })
      },
    })
  }

  return (
    <Form
      form={form}
      name="add-contact-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: '24px' }}
    >
      <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name! ' }]}>
        <Input placeholder="i.e. John" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name! ' }]}>
        <Input placeholder="i.e. Smith" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
          >
            Add Contact
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddContact
