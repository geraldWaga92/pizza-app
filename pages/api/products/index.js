import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  //add our cookies here for users security
  const { method, cookies } = req;

  // const token = cookies.token

  await dbConnect();//connect first with our DB from util

  if (method === "GET") {
    try {
        //this will find the product that we created
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err.response.data);
    }
  }

  if (method === "POST") {
    //if the user who post do not have a token or the token is not valid then return an error
    // if(!token || token !== process.env.token) {
    //   return res.status(401).json('Not authenticated')
    // }
    
    try {
        //this will create data so that when we use our API tester that data will be send to our DB
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}