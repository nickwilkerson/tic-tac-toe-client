const store = require('./../store')

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
  $('#message').text(`Glad to see ya ${response.user.email}!`)
  store.token = response.user.token
  $('#sign-in').trigger('reset') // clears fields after sign in
  $('#sign-in-element').hide()
  $('#sign-out').show()
  $('#new-game').show()
}
const onSignInFailure = function () {
  $('#message').text('Houston, we have a problem!')
  $('#sign-in').trigger('reset') // clears fields after sign up
}
const onSignOutSuccess = function (response) {
  $('#message').text('Successfully Signed Out!')
  $('#game-board').hide()
  $('#sign-in-element').show()
  $('#new-game').hide()
  $('#sign-out').hide()
}
const onSignOutFailure = function () {
  $('#message').text('Failed to Sign Out')
}

const onCreateGameSuccess = function (response) {
  console.log('you successfully created a game')
  $('#message').text('Successfully Created Game')
}
const onCreateGameFailure = function () {
  $('#message').text('Failed')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure
}
