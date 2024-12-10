/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar";
const RootLayout = ({children}) => {
  return (
    <>
    <Navbar />
    <>{children}</>
    </>
  )
}

export default RootLayout