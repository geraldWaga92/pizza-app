import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

//this component page is for when we click the pizza we'll be directed into another page
const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1);
  //this extras will be stored in our DB when we add them to the cart
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);

  }

  //dynamicly change the price when we check the addons
  const changePrice = (number) => {
    setPrice(price + number);
  }


  const handleChange = (e, option) => {
    //checked if the input box is checked
    const checked = e.target.checked;

    if(checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option])
    } else {
      changePrice(-option.price);
      //this means that if the extras._id is not thesame id with option._id then just remain there in the box,
      //but if it is thesame just remove using filter
      setExtras(extras.filter((extras) => extras._id !== option._id ))
    }
  }

  //when we click the add to cart all this elements will be added into our cart component and our cart navbar will count 
  //the number we add to cart
  const handleClick = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectfit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size2.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size2.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size2.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {/* before we have three inputs for our additional flavor but here we destructure the extraOptions by using map
          so whatever we post a product with it's extraOptions, it will only display the product addons */}
            {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>

           ))}
        </div>
        <div className={styles.add}>
            <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

//the params means the parameter on each product, remember each product has it's own id
export const getServerSideProps = async ({params}) => {
  
  //
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);// the "${params}" is the product id"
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;