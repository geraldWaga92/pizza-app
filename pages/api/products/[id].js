import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    //"query: {id}" will be our product id
  const { method, query: {id} } = req;


  dbConnect();//connect first with our DB from util

  if (method === "GET") {
    try {
       //this time will find a product by it's id, by using the above query: {id} with it's 'id'
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    
    try {
        //this will create data so that when we use our API tester that data will be send to our DB
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    
    try {
        //this will create data so that when we use our API tester that data will be send to our DB
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}