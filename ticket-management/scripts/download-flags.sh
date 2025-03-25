#!/bin/bash

# Create flags directory if it doesn't exist
mkdir -p public/flags

# Download flags from flagicons.lipis.dev
declare -A flags=(
  ["gb"]="gb"
  ["fr"]="fr"
  ["de"]="de"
  ["cn"]="cn"
  ["jp"]="jp"
  ["tr"]="tr"
  ["es"]="es"
  ["hk"]="hk"
)

for code in "${!flags[@]}"; do
  curl -o "public/flags/${code}.svg" "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${code}.svg"
  echo "Downloaded ${code}.svg"
done

echo "All flags downloaded successfully!" 