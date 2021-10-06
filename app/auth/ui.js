const store = require('./../store')

const onSignUpSuccess = function (response) {
  $('#message').text(`Thanks For Signing Up ${response.user.email}!`)
  $('#sign-up').trigger('reset') // clears fields after sign up
  $('#sign-in').show()
  $('#sign-up').hide()
}
const onSignUpFailure = function () {
  $('#message').text('Houston, we have a problem! That email is already taken or your passwords do not match.')
  $('#sign-up').trigger('reset') // clears fields after sign up
}
const onSignInSuccess = function (response) {
  $('.announcement').text(`Glad to see ya ${response.user.email}!`)
  // $('#message').hide()
  $('.container').show()
  store.token = response.user.token
  $('#sign-in').trigger('reset') // clears fields after sign in
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#new-game').show()
}
const onSignInFailure = function () {
  $('#message').text('Login Failed: Your user email or password is incorrect.')
  $('#sign-in').trigger('reset') // clears fields after sign up
}
const onSignOutSuccess = function (response) {
  $('.announcement').text('Successfully Signed Out!')
  $('#game-board').hide()
  $('#sign-in').show()
  $('#new-game').hide()
  $('#sign-out').hide()
  $('.container').hide()
}
const onSignOutFailure = function () {
  $('#message').text('Failed to Sign Out')
}

const onCreateGameSuccess = function (response) {
  store.game = response.game
  console.log('new game created: ', store.game)
}
const onCreateGameFailure = function () {
  $('#message').text('Failed')
}

const onGameUpdateSuccess = function (response) {
  store.game = response.game
  if (store.game.over) {
    if (store.winner === '') {
      $('.announcement').text('Its a tie!')
      return
    }
    $('.announcement').text(`${store.winner} wins! Thanks for playing.`)
  }
}
const onGameUpdateFailure = function () {
  console.log('failed to update')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onGameUpdateSuccess,
  onGameUpdateFailure
}
