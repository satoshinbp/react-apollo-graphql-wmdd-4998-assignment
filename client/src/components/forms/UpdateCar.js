import React, { useEffect, useState } from 'react'
import { filter } from 'lodash'
import { Form, Input, InputNumber, Select, Button } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CONTACTS } from '../../queries/contacts'
import { GET_CARS, UPDATE_CAR } from '../../queries/cars'

const UpdateCar = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [model, setModel] = useState(props.model)
  const [make, setMake] = useState(props.make)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)

  const [form] = Form.useForm()

  useEffect(() => forceUpdate(), [])

  const { data, loading } = useQuery(GET_CONTACTS)
  const options =
    data?.contacts.map(contact => ({
      label: `${contact.firstName} ${contact.lastName}`,
      value: contact.id,
    })) || []

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'model':
        setModel(value)
        break
      case 'make':
        setMake(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    updateCar({
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
        updateCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (cache, { data: { updateCar } }) => {
        if (personId === props.personId) return
        const { cars } = cache.readQuery({
          query: GET_CARS,
          variables: { personId: props.personId },
        })
        cache.writeQuery({
          query: GET_CARS,
          data: { cars: filter(cars, car => car.id !== updateCar.id) },
          variables: { personId: props.personId },
        })
        const data = cache.readQuery({
          query: GET_CARS,
          variables: { personId },
        })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, updateCar],
          },
          variables: { personId },
        })
      },
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{ year, make, model, price, personId }}
      size="large"
    >
      <Form.Item name="year" rules={[{ required: true, message: 'Please input a car year!' }]}>
        <InputNumber onChange={value => updateStateVariable('year', value)} min={1900} max={2021} />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Please input a car make!' }]}>
        <Input onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Please input a car model!' }]}>
        <Input onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Please input a car price!' }]}>
        <InputNumber
          onChange={value => updateStateVariable('price', value)}
          min={0}
          step={0.01}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
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
            disabled={
              (!form.isFieldTouched('year') &&
                !form.isFieldTouched('make') &&
                !form.isFieldTouched('model') &&
                !form.isFieldTouched('price') &&
                !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
