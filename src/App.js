import React, { lazy, useState } from 'react';


import './App.scss';

// import { Cart } from './components/Cart';
// import wrong take 1h to fix

import Header from './components/Header';
import Menu from './components/Menu';

import CodeHtml from './components/CodeHtml';
import CopyRight from './components/CopyRight';
import Footer from './components/Footer';
import NearFooter from './components/NearFooter';
import NewsVideo from './components/NewsVideo';
import KhuyenMai from './components/KhuyenMai';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import OrderHistory from './pages/OrderHistory';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import Search from './pages/Search';
// import data from './data.json'
//tast 1 - list product
function App() {
  // const [products, setProducts] = useState(data);
  // console.log(products);
  // const [size, setSize] = useState("");
  // const [sort, setSort] = useState("");

  return (
    <BrowserRouter>
      <>
        <Header />


        <Switch>
          <Route path="/" exact={true} component={Home} />

          <Route path="/category/:category/page/:pageNumber" component={Category} exact />

          <Route path="/category/:category" component={Category} exact />

          <Route path="/category" component={Category} exact />






          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/page/:pageNumber"
            component={Search}

          ></Route>


          <Route
            path="/search/name/:name/min/:min/max/:max/rating/:rating/order/:order/page/:pageNumber"
            component={Search}

          ></Route>

          <Route
            path="/search/name/:name"
            component={Search}

          ></Route>

          <Route
            path="/search"
            component={Search}

          ></Route>



          <Route path="/signin" component={SignIn} />

          <Route path="/register" component={Register} />

          <PrivateRoute path="/profile" component={Profile}></PrivateRoute>


          <Route path="/product/:id" component={ProductDetail} exact />

          <Route path="/cart" component={Cart} exact />
          <Route path="/cart/:id" component={Cart} exact />

          <Route path="/order/:id" component={OrderDetail} />

          <Route path="/orderhistory" component={OrderHistory} />
        </Switch>



        <CodeHtml />
        <NewsVideo />
        <KhuyenMai />
        <NearFooter />
        <Footer />
        <CopyRight />

      </>
    </BrowserRouter>

  );
}

export default App;
