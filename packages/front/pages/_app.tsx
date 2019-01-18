import App, { Container } from "next/app"
import React from "react"
import { ApolloProvider } from "react-apollo"
import withApollo from '../lib/withApollo'
import { initStore } from '../lib/store'
import withRedux from 'next-redux-wrapper'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any
    return (
      <Container>
        <ApolloProvider client={apolloClient} >
            <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(withRedux(initStore)(MyApp))
