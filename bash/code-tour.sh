#!/usr/bin/env bash

# unfinished implementation of zcaceres/code-tour, which was migrated from bash to JS
#####################################################################

# Code Tour. Add tour stops in tour.json
#
# Broken? Slack @zachc
#####################################################################

listen_for_input () {
    while : ; do
        read -s -n 1 key <&1
        
        if [[ $key = "" ]] ; then
            break
        fi

        if [[ $key = o ]] ; then
            open $filePath;
        fi

        if [[ $key = q ]] ; then
            echo "Bye!"
            exit 0;
        fi
    done
}

show_code_preview () {
    sed -n "${startLine},${endLine}p" $filePath 
}

give_tour () {
    jq -c '.[]' 'tour.json' |
    jq -r '.title, .description, .filePath, .startLine, .endLine' |
        while read title; do
            clear

            read description;
            read filePath;
            read startLine;
            read endLine;

            figlet $title

            echo; echo;
            
            echo $description
        
            
            # We explicitly check against null here since `jq` will send a string 'null' (not the Bash's null -- which is an empty string).
            if [ $filePath != "null" ]; then
                echo "$filePath"
                if  [ -n $startLine ] && [ -n $endLine ]; then
                    echo "======================================"
                    show_code_preview
                    echo "======================================"
                fi;
            fi;

            echo; echo; echo;

            echo "Press Enter to Continue. Press o to open the file in your default editor. Press q to quit." >&2

            listen_for_input

            echo "======================================"
        done
}

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

install_dependencies
give_tour
