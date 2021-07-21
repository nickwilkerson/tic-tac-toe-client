const store = require('./../store')
const config = require('./../config')

const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data // we're passing our data to the function
  })
}
const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}
const signOut = function () {
  // console.log(store.token)
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}
const createGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}
const updateGame = function (gameData) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    data: gameData,
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  createGame,
  updateGame
}
