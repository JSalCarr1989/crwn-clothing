import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBSIfGniCDOZT-ZKSDWUtTc-tOoaaFkHLE",
    authDomain: "crwn-db-1ad03.firebaseapp.com",
    projectId: "crwn-db-1ad03",
    storageBucket: "crwn-db-1ad03.appspot.com",
    messagingSenderId: "388213637776",
    appId: "1:388213637776:web:7ba5518ed5fefd40218e15"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()


    console.log(snapShot)

    if (!snapShot.exists) { // revisamos si el usuario existe , si no existe lo creamos

        const { displayName, email } = userAuth

        const createdAt = new Date()

        try {

            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }) // usando la referencia de firestore con set podemos crear un nuevo documento en la base de datos

        }
        catch (error) {
            console.log('error creating user', error.message)
        }

    }

    return userRef;

    // console.log(firestore.doc('users/asssaassasasa'))
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// configuracion para usar el sign in de firebase desde codigo
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase