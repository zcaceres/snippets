stripe payment_intents list --limit 1000 | jq '.data | .[] | .id' | xargs -I {} stripe payment_intents cancel {}
