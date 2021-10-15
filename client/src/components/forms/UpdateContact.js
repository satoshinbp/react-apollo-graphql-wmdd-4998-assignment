import React, { useEffect, useState } from 'react'

import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_CONTACT } from '../../queries'

const UpdateContact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [updateContact] = useMutation(UPDATE_CONTACT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate()
  }, [])

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const onFinish = values => {
    const { firstName, lastName } = values

    updateContact({
      variables: {
        id,
        firstName,
        lastName
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateContact: {
          __typename: 'Contact',
          id,
          firstName,
          lastName
        }
      }
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName
      }}
      size='large'
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please input a first name!' }]}
      >
        <Input onChange={e => updateStateVariable('firstName', e.target.value)} />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Please input a last name!' }]}>
        <Input onChange={e => updateStateVariable('lastName', e.target.value)} />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateContact
