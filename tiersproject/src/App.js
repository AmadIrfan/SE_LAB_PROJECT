import './App.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import SignUpForm from './Components/signup';
import LoginForm from './Components/login';
// import Navbar from './Components/navbar';
import Static from './Components/static';
import CustomerDashboard from './Components/customerdashboard';
// import AdminportalNAvbar from './Components/adminportal';
import Dashboard from './Components/admindashboard';
import AddProduct from './Components/addproducts';
import Manageprodinadmin from './Components/manageprodinadmin';
import Showproducts from './Components/viewproductsincustomer';
import ViewSpecifiedProduct from './Components/viewSpecifiedProduct';
import CustomerCart from './Components/customerCart';
import CustomerCare from './Components/customerCare';
import Customerservice from './Components/customerservice';
import PrivateRoute from './Components/privateRoute';
import NotFoundPage from './Components/fourofour';
import BoughtProductsinCustomer from './Components/boughtProductsinCustomer';
import AdminPayments from './Components/admingetpayments';
import Generatereportspage from './Components/generatereportspage';
import AdminProfilePage from './Components/adminprofile';
import Reviewscustomer from './Components/reviewscustomer';
import CustomerProfilePage from './Components/customerProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Static} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <PrivateRoute exact path="/admin" component={Dashboard} />
          <PrivateRoute exact path="/admin/addproduct" component={AddProduct} />
          <PrivateRoute exact path="/admin/updatedelproduct" component={Manageprodinadmin} />
          <PrivateRoute exact path="/admin/CustomerService" component={Customerservice} />
          <PrivateRoute exact path="/admin/payments" component={AdminPayments} />
          <PrivateRoute exact path="/admin/generaterep" component={Generatereportspage} />
          <PrivateRoute exact path="/admin/profile" component={AdminProfilePage} />
          {/* <PrivateRoute exact path="/customer" component={CustomerDashboard} /> */}
          <PrivateRoute exact path="/customer/viewproducts" component={Showproducts} />
          <PrivateRoute exact path="/customer/product/:ProductID" component={ViewSpecifiedProduct} />
          <PrivateRoute exact path="/customer/viewcart" component={CustomerCart} />
          <PrivateRoute exact path="/customer/ccare" component={CustomerCare} />
          <PrivateRoute exact path="/customer/boughtProducts" component={BoughtProductsinCustomer} />
          <PrivateRoute exact path="/customer/reviews" component={Reviewscustomer} />
          <PrivateRoute exact path="/customer/profile" component={CustomerProfilePage} />



        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
