// importing bootstrap
import './../styles/globals.css'
import 'react-input-range/lib/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header/Header';

import withRedux from 'next-redux-wrapper'
import App from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import { loadFromLocalStorage } from '../redux/cart/actions';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { appProps }
  }
  componentDidMount() {
    setTimeout(() => {
      store.dispatch(loadFromLocalStorage())

    }, 1)
  }
  render() {

    const { Component, appProps } = this.props
    return (
      <Provider store={store}>

        <ToastContainer />
        <Header />
        <Component {...appProps} />
      </Provider>
    )
  }
}

const makeStore = () => store

export default withRedux(makeStore)(MyApp)
