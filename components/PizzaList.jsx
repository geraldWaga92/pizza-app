import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {/* map the pizzaList to be displayed in our PizzaCard component */}
         {pizzaList.map((pizza) => (
          // again we use the props pizzaList and now it is called pizza then pass into our PizzaCard
           <PizzaCard key={pizza._id} pizza={pizza}/>
         ))} 
         
      </div>
    </div>
  );
};

export default PizzaList;