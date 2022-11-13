import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({pizzaList}) {
  return (
    <div className={styles.container}>
    
      {/* this Head component is important because of SEO reason */}
      <Head>
        <title>Pizza Shop App</title>
        <meta name="description" content="Best Pizza, Delicous Pizza, Affordable pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {/* this pizzaList will be proped into our pizzaList component to be used */}
      <PizzaList pizzaList = {pizzaList} />
    </div>
  )
}


export const getServerSideProps = async () => {
  
  // let admin = false;

  // if (myCookie.token === process.env.TOKEN) {
  //   admin = true;
  // }

  //we fetch the data we created in our products
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      // admin,
    },
  };
};


