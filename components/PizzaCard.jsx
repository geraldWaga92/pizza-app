import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";

//props from pizzaList
const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      {/* link to the product component by using it's id */}
      <Link href={`/product/${pizza._id}`}>
        <Image src={pizza.img} alt="" width="200" height="200" />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      {/* remember we have different prices in our Schema so we want the first */}
      <span className={styles.price}>{pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
    </div>
  );
};

export default PizzaCard;