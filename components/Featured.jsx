import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/pizza1.jpg",
    "/img/pizza2.jpg",
    "/img/pizza3.jpg",
    "/img/pizza4.jpg",
    "/img/pizza5.jpg"
  ];

  // handleArrow condition
  const handleArrow = (direction) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 4)
      }
      if(direction==="r"){
          setIndex(index !== 4 ? index+1 : 0)
      }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 10 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout="fill" objectfit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {/* we'll receive an errror if we don't put key, so to handle that just add 'i' in our parameters which stands for
        index keys on our image array */}
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectfit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 10 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout="fill" alt="" objectfit="contain"/>
      </div>
    </div>
  );
};

export default Featured;