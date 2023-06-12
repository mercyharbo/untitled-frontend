import { Provider } from 'react-redux'
import Layout from '@/components/Layout'
import store from '@/slice/store'
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'

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
