import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Admin = ({ orders, products}) => {
  //instead of using products, we'll use pizzaList and product as parameters so that when we click delete on the product for our admin dashboard
  //not only it will delete in our DB but also on our browser
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      //when we delete a pizza we first filter the pizzaList and if the pizza._id did not match with the clicked pizza id do nothing
      //and if it matched then delete it
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {


    //to find the status first we find the order, here we filter the order id if it matched the id selected then we returned an array "[0]",
    //and we only want the first array which is 0
    const item = orderList.filter((order) => order._id === id)[0];

    //if the order status is found then our currentStatus will be the item above
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        //this means what we want to change
        status: currentStatus + 1, 
      });
      setOrderList([
        res.data,
        //this means we just deleted the older or previous status and added a new one which is "res.data" which we get from axios.put method
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
            {pizzaList.map((product) => (
              <tbody key={product._id}>
                <tr className={styles.trTitle}>
                  <td> 
                    <Image 
                      src={product.img}
                      width={50}
                      height={50}
                      alt=''
                    />
                  </td>
                  <td>{product._id.slice(0,5)}...</td>
                  <td>{product.title}</td>
                  <td>${product.prices[0]}</td>
                  <td>
                    <button className={styles.button} style={{padding: '5px', border: 'none', color: 'white', cursor: 'pointer'}}>Edit</button>
                    <button 
                      className={styles.button} 
                      style={{padding: '5px', border: 'none', color: 'white', cursor: 'pointer'}}
                      onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0,5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span>
                  : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button} 
                    style={{padding: '5px', border: 'none', color: 'white', cursor: 'pointer'}}
                    onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  //we use context here and if we request to login then we need cookies and if there is no cookie then just empty string
  const myCookie = ctx.req?.cookies || "";

  //if the myCookie token is not matched on the user token then block the request and redirect the user to the login page
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,//means thesame browser tab 
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Admin;