import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/globals.css';
import store from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  // wrap with Layout to see our NavBar and Footer
  return (

    <Provider store={store}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Provider>

    )
      
 
}

export default MyApp
