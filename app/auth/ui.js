$('#sign-in-element').hide()

const onSignUpSuccess = function (response) {
  $('#message').text(`Thanks For Signing Up ${response.user.email}!`)
  $('#sign-up').trigger('reset') // clears fields after sign up
  $('#sign-in-element').show()
  $('#sign-up-element').hide()
}
const onSignUpFailure = function () {
  $('#message').text('Failed To Sign Up')
  $('#sign-up').trigger('reset') // clears fields after sign up
}
const onSignInSuccess = function (response) {
  $('#message').text(`Successfully Signed In ${response.user.email}!`)
  $('#sign-in').trigger('reset') // clears fields after sign in
  $('#sign-in-element').hide()
  $('#game-board').show()
}
const onSignInFailure = function () {
  $('#message').text()
  $('#sign-in').trigger('reset') // clears fields after sign up
}
const alreadyUser = function () {
  // $('#message').trigger('reset')
  $('#sign-up-element').hide()
  $('#sign-in-element').show()
}
const notUser = function () {
  // $('#message').trigger('reset')
  $('#sign-in-element').hide()
  $('#sign-up-element').show()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  alreadyUser,
  notUser
}
