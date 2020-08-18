
    // HTML-defined callbacks:
    // 'open' 'connection' 'disconnect' 'close' 'error'
//  // 'reset' 'data'
//
//

/*
 * handlers should look like this:
 *
    this.notify.id('id',peer.id);
    this.notify.lost('Connection lost. Please reconnect');
    this.notify.lost('Connect Destroyed. Please refresh.');
    this.notify.error(err);
    this.notify.connect('connect',conn.peer);
        this.notify.peer_info(data);
    this.notify.unpair('');
    receive
    */
    var handler_log={
        id: function(s) {log.info('ID:'+s);},
        lost: function(s) {log.info('LOST'+s);},
        error: function(s) {log.info('ERROR'+s);},
        connect: function(s) {log.info('CONNECT:'+s);},
        peer_info: function(s) {log.info("INFO:"+ s);},
        unpair: function (s) {log.info ("UNPAIR:"+s);},
        keyboard: function (nkey) {log.info("KEY:" +nkey);},
        receive: function (s) {log.info("RCV:"+s)},
    }

    class MyPeer {

            id_requested=null;

            constructor(handler) {
                this.notify=handler;
            }

/**
                 * Create the Peer object for our end of the connection.
                 *
                 * Sets up callbacks that handle any events related to our
                 * peer object.
                 */
                 init() {
                    var self=this;

                    // Create own peer object with connection to shared PeerJS server
                    this.peer = new Peer(this.id_requested, { //'uh2', {
                        host: '185.146.28.139',
                        host: 'server.coateslab.org',
                        port: '9000',
                        path: '/myapp',
                        debug: 3,
                        reliable: true,

                        iceServers: [{ 'urls': 'stun:stun.l.google.com:19302' }],

                        // These are all attempts to get iPad/Macs working. Not sure if they work. 01-Aug-20
                        sdpSemantics: 'plan-b',
                        iceTransportPolicy: 'relay',
                    });
                    var peer=this.peer;
                    peer.on('open', function (id) {
                        //var peer=this.peer;
                        // Workaround for peer.reconnect deleting previous id
                        if (self.peer.id === null) {
                            log.info('Received null id from peer open');
                            self.peer.id = self.lastPeerId;
                        } else {
                            self.lastPeerId = self.peer.id;
                        }

                        log.info('myID: ' + self.peer.id);
                        self.notify.id(self.peer.id);
                    });
                    peer.on('connection', function (c) {
                        // Allow only a single connection
                        if (self.conn && self.conn.open) {
                            c.on('open', function() {
                                c.send("Already connected to another client");
                                setTimeout(function() { c.close(); }, 500);
                            });
                            return;
                        }

                        self.conn = c;
                        log.info("Connected to: " + self.conn.peer);
                        self.notify.connect(self.conn.peer);
                        self.ready();
                    });
                    peer.on('disconnected', function () {
                        self.notify.lost('Connection lost. Please reconnect');
                        log.info('Connection lost. Please reconnect');

                        // Workaround for peer.reconnect deleting previous id
                        peer.id = self.lastPeerId;
                        peer._lastServerId = lastPeerId;
                        peer.reconnect();
                    });
                    peer.on('close', function() {
                        conn = null;
                        self.notify.lost('Connect Destroyed. Please refresh.');
                        log.info('Connection destroyed');
                    });
                    peer.on('error', function (err) {
                        log.info(err);
                        alert('' + err);
                        self.notify.error(err);
                    });
                };
                /**
                 * Create the connection between the two Peers.
                 *
                 * Sets up callbacks that handle any events related to the
                 * connection and data received on it.
                 */
                join(friend) {

                    // Close old connection
                    if (this.conn) {
                        this.conn.close();
                    }

                    log.info("trying to join " + friend);

                    // Create connection to destination peer specified in the input field
                    this.conn = this.peer.connect(friend, {
                        //reliable: true,
                        serialization: "json"
                    });
                    var conn=this.conn;

                    log.info(conn);

                    // Inside the callback 'this' is wrong, so give it this 'self' alias to correct OO 'this'
                    // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
                    var self=this;
                    conn.on('open', function () {
                        log.info("Connected to: " + conn.peer);
                        self.notify.connect(conn.peer);

                        // TODO:
                        // Check URL params for comamnds that should be sent immediately
                        //var command = getUrlParam("command");
                        //if (command)
                            //conn.send(command);
                    });
                    // Handle incoming data (messages only since this is the signal sender)
                    conn.on('data', function (data) {
                        //addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
                        log.info(data); // TODO: SAVE

                        if (data.startsWith('FS')) {
                            self.notify.peer_info(data);
                        } else if (data.startsWith('KB')) {
                            self.notify.keyboard(parseInt(data.substr(3) ));
                        } else {
                            self.notify.receive(data);
                        }
                    });
                    conn.on('close', function () {
                        self.notify.unpair('');
                    });
                };
                /**
                 * Triggered once a connection has been achieved.
                 * Defines callbacks to handle incoming data and connection events.
                 */
                ready() {

                    var self=this;

                    self.conn.on('data', function (data) {
                        log.info("Data received");
                        var cueString = "<span class=\"cueMsg\">Cue: </span>";
                        var code=data.substring(0,1)
                        var value=data.substring(1)
                        self.notify.receive(data);
                    });
                    self.conn.on('close', function () {
                        self.notify.error("Connection reset<br>Awaiting connection...");
                        conn = null;
                    });
                }

                /**
                 * Send a signal via the peer connection and add it to the log.
                 * This will only occur if the connection is still alive.
                 */
                 send(message) {
                    var conn=this.conn;
                    log.info(message);
                    if (conn && conn.open) {
                        conn.send(message);
                        log.info(message + " signal sent");
                        //addMessage(cueString + sigName);
                    } else {
                        log.info('Connection is closed');
                    }
                }
    }

