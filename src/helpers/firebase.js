import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBRnmDbEVhGC1RDrShfDYpSbQGZjMIHhQ8",
    authDomain: "bagan-retail.firebaseapp.com",
    databaseURL: "https://bagan-retail.firebaseio.com",
    projectId: "bagan-retail",
    storageBucket: "bagan-retail.appspot.com",
    messagingSenderId: "754174231402",
    appId: "1:754174231402:web:2490cc1f4797732a365b13"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.database()
export const storage = firebase.storage().ref('products')
export const storageProfiles = firebase.storage().ref('profiles')

export const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/bagan-retail.appspot.com/o/products%2F'