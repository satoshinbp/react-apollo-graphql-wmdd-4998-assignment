import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, InputNumber, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_CARS } from '../queries/cars'

const AddCar = () => {
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)

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
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
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
      style={{ marginBottom: '40px' }}
    >
      <Form.Item name="year" rules={[{ required: true, message: 'Please input car year! ' }]}>
        <InputNumber placeholder="i.e. 2019" />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Please input car make! ' }]}>
        <Input placeholder="i.e. Toyota" />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Please input car model! ' }]}>
        <Input placeholder="i.e. Corolla" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Please input car price! ' }]}>
        <InputNumber placeholder="i.e. 40000" step={0.01} />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true, message: 'Please input car person ID! ' }]}>
        <Input placeholder="i.e. 1" />
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
