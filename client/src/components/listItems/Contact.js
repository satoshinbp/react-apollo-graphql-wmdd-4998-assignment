import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Cars from '../lists/Cars'
import UpdateContact from '../forms/UpdateContact'
import RemoveContact from '../buttons/RemoveContact'

const Contact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const updateStateVariable = (variable, value) => {
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

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={{ width: '500px' }}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          <Cars personId={props.id} />
        </Card>
      )}
    </>
  )
}

export default Contact
