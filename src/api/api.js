/* eslint-disable */

export default {
  user_profile: _mockasync(user_profile),
  update_token: _mockasync(update_token)
}

/**
 * Get the user profile from the backend
 * @param ask_for_permission: it IS NOT a good idea ask for ALLOW push notifications in the first time the user gets in the website.
 * perhaps after he browsers or watch the first video.
 * @param token: after the user gives permission (ALLOW), the firebase send a token which will be used to send message for the user device.
 */
function user_profile(user_id) {
  return {
    user_id: user_id,
    push_notification: {
      ask_for_permission: true,
      token: null
    }
  }
}


/**
 * If the user clear data or change the computer etc..he will receive a new token from the firebase messaging.
 * So we need to keep the backend updated
 * @param token: new token
 */
function update_token(user_profile, token) {
  user_profile.push_notification.token = token
  return user_profile
}

function _mockasync(f){
    function mocked(){
        var res = f.apply(this, arguments)
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve({data: res})
            }, 600);
        })
    }
    return mocked
}
