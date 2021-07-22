const getFormFields = require('./../../lib/get-form-fields') // get FormFields
const api = require('./api') // access the api
const ui = require('./ui') // access the ui
// variable to keep track of who the current player is
let currentPlayer = 'x'

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
const onCreateGame = function () {
  $('#game-board').show()
  $('#new-game').hide()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
const gameMove = function (event) {
  // variable to store which cell was clicked on the  game board
  const cellClicked = event.target
  console.log('You clicked: ', cellClicked)
  // variable to get the index number of the space clicked
  const cellIndex = cellClicked.dataset.cellIndex
  console.log('cell index is ', cellIndex)

  // check to see if space is empty on click
  if (cellClicked !== 'x' && cellClicked !== 'o') {
  // if the space is empty, add a game piece(X, O)
    $(cellClicked).text(currentPlayer)
  }
  currentPlayer = currentPlayer === 'o' ? 'x' : 'o'

  // object to pass to the api call in order to place a game piece on the board
  const gameData = {
    game: {
      cell: {
        index: cellIndex,
        value: currentPlayer
      },
      over: false
    }
  }

  // api call for update
  api.updateGame(gameData)
    .then(ui.onGameUpdateSuccess)
    .catch(ui.onGameUpdateFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  alreadyUser,
  notUser,
  onCreateGame,
  gameMove
}
