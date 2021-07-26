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
  $('#new-game').show()
  $('.even').text('')
  $('.odd').text('')
  $('#message').text("It's X's Turn!")
  console.log('game cells: ', store.game)
  $('#game-results').text('')
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
// variable to keep track of who the current player is
let currentPlayer = 'x'

const gameMove = function (event) {
  event.preventDefault()
  // variable to store which cell was clicked on the  game board
  const cellClicked = event.target

  // variable to get the index number of the space clicked
  const cellIndex = cellClicked.dataset.cellIndex
  console.log('cell index is ', cellIndex)

  // check to see if space is empty on click
  if (store.game.cells[cellIndex] === '') {
    // if the space is empty, add a game piece(X, O)
    $(cellClicked).text(currentPlayer)

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

    // when the game is over, display the winner
    if (gameData.game.over === true && winner === 'x' || winner === 'o') {
      $('#game-results').text(`Congrats ${winner}, you win!`)
    } else if (gameData.game.over === true && winner === '') {
      $('#game-results').text('Its a tie!')
    }

    // api call for update
    api
      .updateGame(gameData)
      .then(ui.onGameUpdateSuccess)
      .catch(ui.onGameUpdateFailure)

    // player between x and o on each move
    currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
    $('#message').text(`Its ${currentPlayer}'s Turn!`)
  }
}

let winner
let over

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

  if (one === 'x' && two === 'x' && three === 'x') {
    over = true
    winner = 'x'
  } else if (four === 'x' && five === 'x' && six === 'x') {
    over = true
    winner = 'x'
  } else if (seven === 'x' && eight === 'x' && nine === 'x') {
    over = true
    winner = 'x'
  } else if (one === 'x' && four === 'x' && seven === 'x') {
    over = true
    winner = 'x'
  } else if (two === 'x' && five === 'x' && eight === 'x') {
    over = true
    winner = 'x'
  } else if (three === 'x' && six === 'x' && nine === 'x') {
    over = true
    winner = 'x'
  } else if (one === 'x' && five === 'x' && nine === 'x') {
    over = true
    winner = 'x'
  } else if (three === 'x' && five === 'x' && seven === 'x') {
    over = true
    winner = 'x'
  } else if (one === 'o' && two === 'o' && three === 'o') {
    over = true
    winner = 'o'
  } else if (four === 'o' && five === 'o' && six === 'o') {
    over = true
    winner = 'o'
  } else if (seven === 'o' && eight === 'o' && nine === 'o') {
    over = true
    winner = 'o'
  } else if (one === 'o' && four === 'o' && seven === 'o') {
    over = true
    winner = 'o'
  } else if (two === 'o' && five === 'o' && eight === 'o') {
    over = true
    winner = 'o'
  } else if (three === 'o' && six === 'o' && nine === 'o') {
    over = true
    winner = 'o'
  } else if (one === 'o' && five === 'o' && nine === 'o') {
    over = true
    winner = 'o'
  } else if (three === 'o' && five === 'o' && seven === 'o') {
    over = true
    winner = 'o'
  } else if (one !== '' && two !== '' && three !== '' && four !== '' && five !== '' && six !== '' && seven !== '' && eight !== '') {
    over = true
  }
  return over
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
