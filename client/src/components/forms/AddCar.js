import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, InputNumber, Select, Button } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CONTACTS } from '../queries/contacts'
import { ADD_CAR, GET_CARS_BY_PERSON_ID } from '../queries/cars'

const AddCar = () => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)

  const { data, loading } = useQuery(GET_CONTACTS)
  const options =
    data?.contacts.map(contact => ({
      label: `${contact.firstName} ${contact.lastName}`,
      value: contact.id,
    })) || []

  useEffect(() => forceUpdate({}), [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    const id = uuidv4()

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({
          query: GET_CARS_BY_PERSON_ID,
          variables: { personId },
        })
        cache.writeQuery({
          query: GET_CARS_BY_PERSON_ID,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
          variables: { personId },
        })
      },
    })
  }

  return (
    <Form
      form={form}
      name="add-car-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: '24px' }}
    >
      <Form.Item name="year" rules={[{ required: true, message: 'Please input car year! ' }]}>
        <InputNumber placeholder="i.e. 2019" min={1900} max={2021} />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Please input car make! ' }]}>
        <Input placeholder="i.e. Toyota" />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Please input car model! ' }]}>
        <Input placeholder="i.e. Corolla" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Please input car price! ' }]}>
        <InputNumber
          placeholder="i.e. $ 40,000"
          min={0}
          step={0.01}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          style={{ minWidth: '144px' }}
        />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true, message: 'Please select car person! ' }]}>
        <Select placeholder="i.e. Bill Gates" loading={loading} options={options} />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddCar
