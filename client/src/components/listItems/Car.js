import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'

const getStyles = () => ({
  card: {
    width: '500px',
  },
})

const Contact = props => {
  const styles = getStyles()

  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [model, setModel] = useState(props.model)
  const [make, setMake] = useState(props.make)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)

  const updateStateVariable = (variable, value) => {
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

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          model={props.model}
          make={props.make}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} year={year} model={model} make={make} price={price} personId={personId} />,
          ]}
        >
          {model}
        </Card>
      )}
    </div>
  )
}

export default Contact
