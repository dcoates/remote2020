                /**
                 * Create the connection between the two Peers.
                 *
                 * Sets up callbacks that handle any events related to the
                 * connection and data received on it.
                 */
                function join() {

                    // Close old connection
                    if (conn) {
                        conn.close();
                    }

                    console.log("trying to join " + recvIdInput.value);

                    // Create connection to destination peer specified in the input field
                    conn = peer.connect(recvIdInput.value, {
                        reliable: true
                    });

                    console.log(conn);

                    conn.on('open', function () {
                        status.innerHTML = "Connected to: " + conn.peer;
                        console.log("Connected to: " + conn.peer);

                        // Check URL params for comamnds that should be sent immediately
                        var command = getUrlParam("command");
                        if (command)
                            conn.send(command);
                    });
                    // Handle incoming data (messages only since this is the signal sender)
                    conn.on('data', function (data) {
                        addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
                    });
                    conn.on('close', function () {
                        status.innerHTML = "Connection closed";
                    });
                };

