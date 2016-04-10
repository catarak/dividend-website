#!/usr/bin/expect

set timeout 1000

spawn "./transaction.sh"

expect "Sign and broadcast? (y/N) "
send "y^M"

interact