const getFormFields = require('./../../lib/get-form-fields') // get FormFields
const api = require('./api') // access the api
const ui = require('./ui') // access the ui

const onSignUp = function (event) {
  event.preventDefault() // prevents webpage from refreshing when button is clicked
  const form = event.target // get information from event and form
  const data = getFormFields(form)

  api.signUp(data) // make an API call
    .then(ui.onSignUpSuccess) // handle success api call
    .catch(ui.onSignUpFailure) // handle failure api call
}
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onSignOut = function () {
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const alreadyUser = function () {
  $('#sign-up-element').hide()
  $('#sign-in-element').show()
  $('#message').text('Glad to see ya again!')
}
const notUser = function () {
  $('#sign-in-element').hide()
  $('#sign-up-element').show()
  $('#message').text('Lets get ya signed up!')
}
const newGame = function () {
  $('#game-board').show()
  $('#message').hide()
  $('#new-game').hide()
}
module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  alreadyUser,
  notUser,
  newGame
}
