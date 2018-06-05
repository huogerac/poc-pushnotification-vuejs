importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js')

var config = {
  apiKey: 'AIzaSyABRALdPhSmLH_NdwxQ27gcwG-_v9QacV4',
  authDomain: 'evolutiodev.firebaseapp.com',
  databaseURL: 'https://evolutiodev.firebaseio.com/',
  projectId: 'evolutiodev',
  storageBucket: 'evolutiodev.appspot.com',
  messagingSenderId: '646469414520'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
