<template>

  <div>

    <push-notification
        ref="pushNotification"
        :currentToken="userToken"
        @update-token="onUpdateToken"
        @new-message="onNewMessage" />

    <div id="snackbar-message" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>

    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">

        <div v-show="askForPermission && !userToken" class="headline" style="background-color: #ff897d; padding: 20px; border-radius: 6px; color: #fff;">
          Hey, click here to start receiving our amazing push notifications!!!
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
              @click="enableNotifications">
            Enable notifications
          </button>
        </div>

        <div v-show="userToken">
          <h2>Try to send a message to this user by:</h2>
          <div style="background-color: rgb(65, 65, 65); padding: 20px; border-radius: 6px; color: rgb(228, 255, 0); font-family: monospace;">
            <p>
            curl -i -H 'Content-type: application/json'
                    -H 'Authorization: key={{ firebaseServerKey }}'
                    -XPOST https://fcm.googleapis.com/fcm/send -d '{
                      "registration_ids":["{{ userToken }}"],
                      "notification": {
                          "title":"Title of your notification",
                          "body":"content of your notification"
                      }
                    }'
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PushNotification from '@/components/PushNotification'
import api from '@/api/api'

export default {
  components: {
    PushNotification
  },
  methods: {
    enableNotifications () {
      this.$refs.pushNotification.askForPermission()
    },
    onUpdateToken (newToken) {
      this.userToken = newToken
      // send token to the server
      api.update_token(this.userProfile, this.userToken)
    },
    onNewMessage (message) {
      var snackbarContainer = document.querySelector('#snackbar-message')
      var data = {
        message: message.notification.title + ': ' + message.notification.body,
        timeout: 10000,
        actionText: 'OK'
      }
      snackbarContainer.MaterialSnackbar.showSnackbar(data)
    }
  },
  created () {
    var userLoggedId = 1
    // check if user has a token
    api.user_profile(userLoggedId).then((response) => {
      this.userProfile = response.data
      this.userToken = this.userProfile.push_notification.ask_for_permission.token
      if (this.userProfile.push_notification.ask_for_permission) {
        setTimeout(() => {
          // Simulate it wont ask for permission in the first user access
          this.askForPermission = true
        }, 4000)
      }
    })
  },
  data () {
    return {
      firebaseServerKey: 'AAAAloSUbng:APA91bFyjTm6EEJ_BDFrzsHc4yk0DrXLchwgfybWTwmO7O9A-wa2jcI7un8Ig6NX0VSb8WVfQVQpuO3a0Ictx5bn8bO95Uz3cVLuyiNAiGNUvFUWIFtL9tRaDqiRfg-Yvt-40NGD0Wt9',
      userProfile: {},
      askForPermission: false,
      userToken: null
    }
  }
}
</script>

<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>