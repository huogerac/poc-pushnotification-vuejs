<template>
</template>

<script>
import firebase from '../service/firebase'

export default {
  props: ['currentToken'],
  data () {
    return {
      hasServiceWorker: false
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (!('serviceWorker' in navigator)) {
        console.warn('serviceWorker not working')
        return
      }

      if (!('PushManager' in window)) {
        console.warn('PushManager not working')
        return
      }
      this.hasServiceWorker = true
    },
    askForPermission () {
      if (!this.hasServiceWorker) {
        return
      }
      // console.firebase | project settins | cloud message | web config | Key pair
      firebase.messaging.usePublicVapidKey('BK8JSwxoV2WXvivBQ0deKPy9PVTRaYcYmuwGjJWGpgTAZ7-NM48H1ScVsO6EvMhP7O9jhSGp39XFtRQCPgfDAJI')
      navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
        .then((registration) => {
          firebase.messaging.useServiceWorker(registration)

          firebase.messaging.requestPermission().then(() => {
            firebase.messaging.getToken().then((token) => {
              if (token !== this.currentToken) {
                this.$emit('update-token', token)
              }
            }).catch((err) => console.log('--- token error:', err))
          }).catch(function (err) {
            console.log('Unable to get permission to notify.', err)
          })
        }).catch(err => {
          console.log('error register', err)
        })

      firebase.messaging.onMessage((payload) => {
        this.$emit('new-message', payload)
      })
    }
  }
}
</script>
