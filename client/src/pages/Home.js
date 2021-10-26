import React from 'react'
import Contacts from '../components/lists/Contacts'
import AddContact from '../components/forms/AddContact'
import AddCar from '../components/forms/AddCar'

const Home = () => (
  <>
    <AddContact />
    <AddCar />
    <Contacts />
  </>
)

export default Home
