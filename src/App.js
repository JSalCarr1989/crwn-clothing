import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'



class App extends React.Component {

  unsubscribeFromAuth = null // seteamos la variable inicialmente en nulo

  componentDidMount() {
    const { setCurrentUser } = this.props
    // con el inicio de sesion en google podemos suscribirnos a este evento y retornar el usuario logueado
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {  // si el usuario esta logueado

        const userRef = await createUserProfileDocument(userAuth) // tomamos la referencia del usuario que se creo en firebase


        userRef.onSnapshot(snapShot => { /*
                                                usamos la snapshot de la referencia para suscribirnos a cualquier cambio de
                                                los datos o en este caso traer el primer estado de esos datos para setear 
                                                nuestro state
                                         */
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })

        })



      } else {
        // si el usuario no esta logueado userAuth es null y lo seteamos a nuestro state
        setCurrentUser(userAuth)

      }
    })
  }

  componentWillUnmount() {
    // este metodo nos ayuda a quitar nuestra suscripcion de la libreria de auth de firebase
    this.unsubscribeFromAuth()
  }



  render() {
    return (
      <div>

        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ?
              (<Redirect to="/" />) :
              (<SignInAndSignUpPage />)} />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
