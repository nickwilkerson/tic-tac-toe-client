const authEvents = require('./auth/events')
// const ui = require('./auth/ui')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#already-user').on('click', authEvents.alreadyUser)
  $('#not-user').on('click', authEvents.notUser)
  $('#new-game').on('click', authEvents.onCreateGame)
  $('#new-game').hide()
  $('#sign-up').hide()
  $('#game-board').hide()
  $('#sign-out').hide()
  $('.container').hide()
  $('.game-board').on('click', authEvents.gameMove)
})
