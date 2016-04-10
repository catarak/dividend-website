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