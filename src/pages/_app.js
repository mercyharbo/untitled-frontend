import { Provider, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Layout from '@/components/Layout'
import store from '@/slice/store'

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  )
}
