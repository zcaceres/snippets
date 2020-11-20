# continuously listen for keyboard input
listen_for_input () {
    while : ; do
        read -s -n 1 key <&1
        
        if [[ $key = "" ]] ; then
            # do something
        fi

        if [[ $key = o ]] ; then
            # do something else
        fi

        if [[ $key = q ]] ; then
            echo "Bye!"
            exit 0;
        fi
    done
}