# # TOKEN="60f76e119de16d0017139cb9" INDEX="0" VALUE="X" sh curl-scripts/update-game.sh
# # don't use a password you use for any real websites!
# curl "https://tic-tac-toe-api-development.herokuapp.com/games/60f76f389de16d0017139cc6" \
#   --include \
#   --request PATCH \
#   --header "Content-Type: application/json" \
#   --header "Authorization: Bearer ${TOKEN}" \
#   --data '{
#     "game": {
#       "cell": {
#         "index": "'"${INDEX}"'",
#         "value": "'"${VALUE}"'"
#       },
#       "over": false
#     }
#   }'
# echo
