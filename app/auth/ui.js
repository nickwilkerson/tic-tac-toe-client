const store = require('./../store')

const onSignUpSuccess = function (response) {
  $('#message').text(`Thanks For Signing Up ${response.user.email}!`)
  $('#sign-up').trigger('reset') // clears fields after sign up
  $('#sign-in').show()
  $('#sign-up').hide()
}
const onSignUpFailure = function () {
  $('#message').text('Houston, we have a problem!')
  $('#sign-up').trigger('reset') // clears fields after sign up
}
const onSignInSuccess = function (response) {
  $('#message').text(`Glad to see ya ${response.user.email}!`)
  store.token = response.user.token
  $('#sign-in').trigger('reset') // clears fields after sign in
  $('#sign-in').hide()
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
  $('#sign-in').show()
  $('#new-game').hide()
  $('#sign-out').hide()
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
      $('#game-results').text('Its a tie!')
      return
    }
    $('#game-results').text(`congrats ${store.winner}, you win!`)
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
