    class staircase {
            constructor(size,stair_N) {
                this.stair_N=stair_N; // N-up-1down
                this.restart(size); 
            }

            restart(size) {
                this.stair_trial=0;
                this.consecutive_corrects=0;
                this.stair_size=size; // TODO
                this.nReversals=0;
                this.prev_corr=true; // assume first one correcta (still going "down")
            }

            next() {
                get_metap(); // TODO: we shouldn't access any UI stuff in here
                do_trial();  // TODO: refactor out of UI

                this.stair_trial += 1;
                set_html("lblStair",`Staircase ${this.stair_trial} ${this.nReversals}`);

                // Did enough reversals? 
                if (this.nReversals>metap.staircase_reversals.length ) { // TODO: rmv from UI
                    set_checked( "chkStair", false);
                }
            }

            update(correct,ori_resp) {
                var isReversal = false;

                // N-up-1-down logic
                if (true) {
                    var step_size=metap.staircase_reversals[this.nReversals];
                    var prev_size=this.stair_size;

                    if (correct) {
                        this.consecutive_corrects+=1;
                        if (this.consecutive_corrects==(this.stair_N-1) ){
                            this.stair_size /= step_size;
                            this.consecutive_corrects=0;
                            if (! (this.prev_corr)) {
                                isReversal=true; // first reversal after an error
                            } else {
                                isReversal=false; // still going up
                            }
                            this.prev_corr=true;
                        } else {
                            // First correct of sequence, shouldn't yet change prev_corr, etc.
                            ;
                        }
                    } else {
                        this.stair_size *= step_size;
                        this.consecutive_corrects=0;
                        if (this.prev_corr) {
                            isReversal=true; // first wrong after previous correct is considered reversal
                        }
                        this.prev_corr=false;
                    }

                    if (isReversal) {
                        this.nReversals += 1;
                    }

                    // Log response -- TODO move out bad UI spaghetti , maybe log elsewhere, not just UI
                    set_html("log",get_html("log")+"\n"+
                        this.stair_trial+","+prev_size+","+trial_params['orientation']+','+ori_resp+','+correct+','+isReversal+','+this.nReversals);

                    // Get next one:
                    var oriNew=getRandomInt(4)*90
                    // Set up trial parameters, which are merged with the code to do 1 trial
                    set_value("trial",`trial_params={\n\torientation: ${oriNew},\n\tsize:`+
                        this.stair_size+"\n}");

                    // Finished ?
                    if (this.nReversals>=metap.staircase_reversals.length ) {
                        set_checked( "chkStair", false); // TODO: out of UI
                        set_html("lblStair","FINISHED");
                        beep(1,440,80);
                    } else {
                        this.next(); // execute next
                    }
                }
            };
        }

    class MOCS {
            constructor() {
            }

            restart(levels,repeats) {
                this.levels=levels; 
                this.repeats=repeats;
                this.num_trial=0;

                var remaining=[]; // bc can't access 'this' in forEach (?)
                this.levels.forEach(function(entry) { // List of valid trials yet to run
                    var level1={}
                    level1['which']=entry;
                    level1['remaining']=repeats;
                    remaining.push(level1);
                });
                this.remaining=remaining;
                };

            total_remaining() {
                var total=0;
                this.remaining.forEach(function(entry) { // List of valid trials yet to run
                    total += entry['remaining'];
                });
                return total;
            }

            update(correct,ori_resp) {

                set_html("log",get_html("log")+"\n"+
                    this.num_trial+","+this.remaining[this.index_which]['which']+","+trial_params['orientation']+','+ori_resp+','+correct+',0,0');
                this.remaining[this.index_which]['remaining'] -= 1;
                if (this.remaining[this.index_which]['remaining']==0) {
                    this.remaining.splice(this.index_which,1); // remove 1 item from middle of array
                }

                set_html("lblStair",`MOCS ${this.total_remaining()}`); //TOTAL

                // Finished ?
                if (this.remaining.length < 1 ) {
                    set_checked( "chkStair", false); // TODO: out of UI
                    set_checked( "chkMOCS", false); // TODO: out of UI
                    set_html("lblStair","FINISHED");
                    beep(1,440,80);
                } else {
                    this.next(); // execute next
                }
            };

            next() {
                this.index_which=getRandomInt(this.remaining.length);

                // Get random orientation
                var oriNew=getRandomInt(4)*90

                // Set up trial parameters, which are merged with the code to do 1 trial
                set_value("trial",`trial_params={\n\torientation: ${oriNew},\n\tsize:`+
                        this.remaining[this.index_which]['which']+"\n}");

                do_trial(); // TODO: figure out better place for this
            };
        }; // MOCS class
