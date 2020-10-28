import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import { auth } from './helpers/firebase'
import Login from './pages/Login'
import Default from './pages/Default'
import Home from './pages/Home'
import Categories from './pages/categories/Categories'
import Products from './pages/products/Products'
import Units from './pages/units/Units'
import Orders from './pages/orders/Orders'
import Accounts from './pages/accounts/Accounts'
import NewAccounts from './pages/registeraccounts/NewAccounts'
import AddCategory from './pages/categories/AddCategory'
import EditCategory from './pages/categories/EditCategory'
import EditUnit from './pages/units/EditUnit'
import AddUnit from './pages/units/AddUnit'
import EditNewAccount from './pages/registeraccounts/EditNewAccount'
import AddAccount from './pages/accounts/AddAccount'
import CreateProduct from './pages/products/CreateProduct'
import QrProduct from './pages/products/QrProduct'
import SmallSideBar from './components/layout/SmallSideBar'
import NotificationBar from './components/layout/NotificationBar'
import MoonLoader from 'react-spinners/MoonLoader'


class App extends Component {

  state = {
    authenticated: false,
    loading: true
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  render() {
    
    const cssName = {
      margin: {
        margin: '0 auto'
      }
    }

    return this.state.loading ? (
      <div 
        className="position-fixed"
        style={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(29,45,80,0.62)',
            zIndex: 9999
        }}
      >
        <div className="d-table w-100 h-100">
            <div className="d-table-cell align-middle text-center">
              <MoonLoader
                css={cssName.margin}
                size={20}
                color={"#fff"}
                loading={this.state.loading}
              />
            </div>
        </div>
      </div>
    ) : (
      <React.Fragment>
        <Router>
          
          <SmallSideBar />
          <NotificationBar />

          <Switch>
            <PrivateRoute
              exact
              path='/'
              authenticated={this.state.authenticated}
              component={Home}
            />
            <PrivateRoute
              path='/edit-category/:id'
              authenticated={this.state.authenticated}
              component={EditCategory}
            />
            <PrivateRoute
              path='/edit-unit/:id'
              authenticated={this.state.authenticated}
              component={EditUnit}
            />
            <PrivateRoute
              path='/edit-newaccount/:id'
              authenticated={this.state.authenticated}
              component={EditNewAccount}
            />
            <PrivateRoute
              path='/qr-product/:id'
              authenticated={this.state.authenticated}
              component={QrProduct}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
            <PrivateRoute
              path="/orders"
              authenticated={this.state.authenticated}
              component={Orders}
            />
            <PrivateRoute
              path="/products"
              authenticated={this.state.authenticated}
              component={() => <Products key />}
            />
            <PrivateRoute
              path="/add-product"
              authenticated={this.state.authenticated}
              component={CreateProduct}
            />
            <PrivateRoute
              path="/accounts"
              authenticated={this.state.authenticated}
              component={Accounts}
            />
            <PrivateRoute
              path="/add-account"
              authenticated={this.state.authenticated}
              component={AddAccount}
            />
            <PrivateRoute
              path="/new-accounts"
              authenticated={this.state.authenticated}
              component={NewAccounts}
            />
            <PrivateRoute
              path="/categories"
              authenticated={this.state.authenticated}
              component={Categories}
            />
            <PrivateRoute
              path="/units"
              authenticated={this.state.authenticated}
              component={Units}
            />
            <PrivateRoute
              path="/add-category"
              authenticated={this.state.authenticated}
              component={AddCategory}
            />
            <PrivateRoute
              path="/add-unit"
              authenticated={this.state.authenticated}
              component={AddUnit}
            />
            <PrivateRoute
              authenticated={this.state.authenticated}
              component={Default}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App