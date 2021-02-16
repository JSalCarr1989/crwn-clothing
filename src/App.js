import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { Switch, Route } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null // seteamos la variable inicialmente en nulo

  componentDidMount() {
    // con el inicio de sesion en google podemos suscribirnos a este evento y retornar el usuario logueado
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {  // si el usuario esta logueado

        const userRef = await createUserProfileDocument(userAuth) // tomamos la referencia del usuario que se creo en firebase


        userRef.onSnapshot(snapShot => { /*
                                                usamos la snapshot de la referencia para suscribirnos a cualquier cambio de
                                                los datos o en este caso traer el primer estado de esos datos para setear 
                                                nuestro state
                                         */

          // console.log(snapShot.data())

          // console.log({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // })

          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log(this.state) // si queremos revisar nuestro state al setearlo
          })

        })



      } else {
        // si el usuario no esta logueado userAuth es null y lo seteamos a nuestro state
        this.setState({ currentUser: userAuth })

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

        <Header currentUser={this.state.currentUser} />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
