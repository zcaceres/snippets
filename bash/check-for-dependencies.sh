# check for deps and, if they're not available, install them

install_dependencies () {
    if ! [ -x "$(command -v jq)" ]; then
        echo "You don't have jq installed. Installing that first..."
        brew install jq
    fi

    if ! [ -x "$(command -v figlet)" ]; then
        echo "You don't have figlet installed. Installing that first..."
        brew install figlet
    fi
}
