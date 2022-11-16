import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';

const NavBar = () => {

  //this is from our cartSlice reducer, we specify the state of the quantity is zero
  const quantity = useSelector((state) => state.cart.quantity)
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
        {/* go to homepage */}
        <Link href='/' passHref>
           <Image src='/img/logo5.png' width="150" height="120" alt=''/>  
        </Link>
      
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>+12 345 678 </div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href={'/'}>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      {/* we use link to go into cart page */}
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart2.png" alt="" width="30" height="30" />
            {/* our initial state of quantity is zero  */}
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NavBar