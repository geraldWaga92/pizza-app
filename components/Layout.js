import NavBar from "./NavBar";
import Footer from "./Footer";
import Featured from "./Featured";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Featured />
      { children }
      <Footer/>
    </>
  )
}

export default Layout