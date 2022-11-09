import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // wrap with Layout to see our NavBar and Footer
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>

    )
      
 
}

export default MyApp
