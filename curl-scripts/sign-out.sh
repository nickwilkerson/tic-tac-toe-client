# TOKEN="" sh curl-scripts/sign-out.sh
#!/bin/bash

curl "https://tic-tac-toe-api-development.herokuapp.com/sign-out" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"

echo