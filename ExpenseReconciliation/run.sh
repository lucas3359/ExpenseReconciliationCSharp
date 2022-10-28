#!/bin/sh

echo "Running docker script to update Client ID"

sed -i '/s/__GOOGLE_CLIENT_ID__/'"$GOOGLE_CLIENT_ID"'/g' /app/ClientApp/build/index.html

dotnet ExpenseReconciliation.dll