import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../lib/store'
import { setChats } from '../store/chats/actions'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props as any
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setChats: chats => {
    dispatch(setChats(chats))
  },
 });

export default withApolloClient(withRedux(initStore, null, mapDispatchToProps)(MyApp))
