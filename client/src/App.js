import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Title from './components/layout/Title'
import Home from './pages/Home'
import Person from './pages/Person'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={Person} />
        </Switch>
      </Router>
    </div>
  </ApolloProvider>
)

export default App
