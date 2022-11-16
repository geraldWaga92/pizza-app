import cookie from "cookie";

const handler = (req, res) => {
    // if the user is using a post method, or posting a new product then that user must be an admin
  if (req.method === "POST") {
    const { username, password } = req.body;
    //our validation
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
    //if our username and password is correct then we're gonna send our cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,// 1 hour
          sameSite: "strict",
          path: "/",//means this cookie will be used in all path
        })
      );
      res.status(200).json("Succesfull");
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
