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
const alreadyUser = function () {
  $('#sign-up-element').hide()
  $('#sign-in-element').show()
}
const notUser = function () {
  $('#sign-in-element').hide()
  $('#sign-up-element').show()
}

module.exports = {
  onSignUp,
  onSignIn,
  alreadyUser,
  notUser
}
