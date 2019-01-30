import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../lib/store'
import { Provider } from 'react-redux'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient, store } = this.props as any
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(withRedux(initStore)(MyApp))
