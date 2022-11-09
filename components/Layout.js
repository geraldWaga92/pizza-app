import NavBar from "./NavBar";
import Footer from "./Footer";
import Featured from "./Featured";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      { children }
      <Footer/>
    </>
  )
}

export default Layout