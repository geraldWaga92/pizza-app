import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
    
      {/* this Head component is important because of SEO reason */}
      <Head>
        <title>Pizza Shop App</title>
        <meta name="description" content="Best Pizza, Delicous Pizza, Affordable pizza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
   
    </div>
  )
}
