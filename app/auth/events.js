const getFormFields = require('./../../lib/get-form-fields') // get FormFields
const api = require('./api') // access the api
const ui = require('./ui') // access the ui
const store = require('./../store') // access the store value

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
  $('#new-game').text('Play a Game')

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onSignOut = function () {
  $('#game-results').text('')
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const alreadyUser = function () {
  $('#sign-up').hide()
  $('#sign-in').show()
  $('#message').text('')
}
const notUser = function () {
  $('#sign-in').hide()
  $('#sign-up').show()
  $('#message').text('')
}
const onCreateGame = function () {
  $('#game-board').show()
  $('#new-game').hide()
  $('.even').text('')
  $('.odd').text('')
  $('.announcement').text("It's X's Turn!")
  console.log('game cells: ', store.game)
  $('#game-results').text('')
  currentPlayer = 'X'
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
// variable to keep track of who the current player is
let currentPlayer = 'X'

const gameMove = function (event) {
  event.preventDefault()
  // variable to store which cell was clicked on the  game board
  const cellClicked = event.target

  // variable to get the index number of the space clicked
  const cellIndex = cellClicked.dataset.cellIndex

  // when the game is over, end the game
  if (store.game.over) return

  // check to see if space is empty on click
  if (store.game.cells[cellIndex] === '') {
    // if the space is empty, add a game piece(X, O)
    $(cellClicked).text(currentPlayer)
    store.game.cells[cellIndex] = currentPlayer
    // check to see if there is a winner to update gameData value
    const gameOver = checkWin()

    // object to pass to the api call in order to place a game piece on the board
    const gameData = {
      game: {
        cell: {
          index: cellIndex,
          value: currentPlayer
        },
        over: gameOver
      }
    }
    console.log('game data ', gameData)
    // player between x and o on each move
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
    $('.announcement').text(`${currentPlayer}'s Turn!`)

    if (gameOver) {
      $('#new-game').show()
      $('#new-game').text('Play Again?')
    }

    // api call for update
    api
      .updateGame(gameData)
      .then(ui.onGameUpdateSuccess)
      .catch(ui.onGameUpdateFailure)
  }
}

const checkWin = function () {
  // array value
  const cell = store.game.cells
  const one = cell[0]
  const two = cell[1]
  const three = cell[2]
  const four = cell[3]
  const five = cell[4]
  const six = cell[5]
  const seven = cell[6]
  const eight = cell[7]
  const nine = cell[8]

  if (one === 'X' && two === 'X' && three === 'X') {
    store.winner = 'X'
    return true
  } else if (four === 'X' && five === 'X' && six === 'X') {
    store.winner = 'X'
    return true
  } else if (seven === 'X' && eight === 'X' && nine === 'X') {
    store.winner = 'X'
    return true
  } else if (one === 'X' && four === 'X' && seven === 'X') {
    store.winner = 'X'
    return true
  } else if (two === 'X' && five === 'X' && eight === 'X') {
    store.winner = 'X'
    return true
  } else if (three === 'X' && six === 'X' && nine === 'X') {
    store.winner = 'X'
    return true
  } else if (one === 'X' && five === 'X' && nine === 'X') {
    store.winner = 'X'
    return true
  } else if (three === 'X' && five === 'X' && seven === 'X') {
    store.winner = 'X'
    return true
  } else if (one === 'O' && two === 'O' && three === 'O') {
    store.winner = 'O'
    return true
  } else if (four === 'O' && five === 'O' && six === 'O') {
    store.winner = 'O'
    return true
  } else if (seven === 'O' && eight === 'O' && nine === 'O') {
    store.winner = 'O'
    return true
  } else if (one === 'O' && four === 'O' && seven === 'O') {
    store.winner = 'O'
    return true
  } else if (two === 'O' && five === 'O' && eight === 'O') {
    store.winner = 'O'
    return true
  } else if (three === 'O' && six === 'O' && nine === 'O') {
    store.winner = 'O'
    return true
  } else if (one === 'O' && five === 'O' && nine === 'O') {
    store.winner = 'O'
    return true
  } else if (three === 'O' && five === 'O' && seven === 'O') {
    store.winner = 'O'
    return true
  } else if (one !== '' && two !== '' && three !== '' && four !== '' && five !== '' && six !== '' && seven !== '' && eight !== '' && nine !== '') {
    store.winner = ''
    return true
  }
  return false
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
