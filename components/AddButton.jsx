import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    //when clicked again it's gonna update our setClose to false
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;