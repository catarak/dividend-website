#!/usr/bin/env bash

while getopts "d:" arg; do
  case $arg in
    d)
      destination=${OPTARG}
      echo $destination
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done


counterparty-client --wallet-password="escape" send --source=191A1Uq7xftJu9yisYYQe6pykA9k1EQnNE --quantity=1 --asset=CASSIE --destination=$destination
