import React from 'react'
import './App.css'
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import AddContact from './components/forms/AddContact'
import AddCar from './components/forms/AddCar'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <AddContact />
      <AddCar />
      <Contacts />
    </div>
  </ApolloProvider>
)

export default App
