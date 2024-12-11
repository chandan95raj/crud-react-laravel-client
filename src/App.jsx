import RootLayout from "./shared/Layout/RootLayout";
import LoginPage from "./pages/LoginPgae";
import SignupPage from "./pages/SignupPage";
import AdminLayout from "./shared/Layout/AdminLayout";
import PrivateRoute from "./shared/Layout/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'material-icons/iconfont/material-icons.css';
import { ToastContainer } from 'react-toastify';
import ProductList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout><LoginPage /></RootLayout>} />
          <Route path='/signup' element={<RootLayout><SignupPage /></RootLayout>} />
          <Route path="/dashboard" element={<AdminLayout><PrivateRoute><DashboardPage /></PrivateRoute></AdminLayout>} />
          <Route path="/productlist" element={<AdminLayout><PrivateRoute><ProductList /></PrivateRoute></AdminLayout>} />
          <Route path="/addproduct" element={<AdminLayout><PrivateRoute><AddProduct /></PrivateRoute></AdminLayout>} />
          <Route path="/editproduct/:id/edit" element={<AdminLayout><PrivateRoute><EditProduct /></PrivateRoute></AdminLayout>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App