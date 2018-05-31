import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyABRALdPhSmLH_NdwxQ27gcwG-_v9QacV4',
  authDomain: 'evolutiodev.firebaseapp.com',
  databaseURL: 'https://evolutiodev.firebaseio.com/',
  projectId: 'evolutiodev',
  storageBucket: 'evolutiodev.appspot.com',
  messagingSenderId: '646469414520'
}

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
