import LoginPage from "./pages/LoginPgae";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import RootLayout from "./shared/Layout/RootLayout";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'material-icons/iconfont/material-icons.css';
import { ToastContainer } from 'react-toastify';
import AdminLayout from "./shared/Layout/AdminLayout";
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
          <Route path='/dashboard' element={<AdminLayout><DashboardPage /></AdminLayout>} />
          <Route path='/productlist' element={<AdminLayout><ProductList /></AdminLayout>} />
          <Route path='/addproduct' element={<AdminLayout><AddProduct /></AdminLayout>} />
          <Route path="/editproduct/:id/edit" element={<AdminLayout><EditProduct /></AdminLayout>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App