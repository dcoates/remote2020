'use strict';

    function generate_ori(nafc) {
        var ori;
        if (nafc==4) {
            ori=getRandomInt(4)*90;
        } else if (nafc==2) {
            ori=getRandomInt(2)*180; // (0 or 1) * 180 : L or R
        }
        return ori;
    }

    // Base class:
    // - curr_trial (woolean, size, etc.)
    // - trial_history   

    class staircase {
            constructor(size,stair_N) {
                this.stair_N=stair_N; // N-up-1down
                this.restart(size); 
            }

            restart(size,nafc) {
                this.stair_trial=0;
                this.consecutive_corrects=0;
                this.stair_size=size; // TODO
                this.nReversals=0;
                this.prev_corr=true; // assume first one correcta (still going "down")
                this.trial_history=[];
                this.nafc=nafc;
            }

            next() {
                get_metap(); // TODO: we shouldn't access any UI stuff in here
                do_trial();  // TODO: refactor out of UI

                this.stair_trial += 1;
                this.compute_mean();

                set_html("lblStair",`Staircase ${this.stair_trial} ${this.nReversals} threshold=${this.mean_last.toPrecision(4)}`);

                // Did enough reversals? 
                if (this.nReversals>metap.staircase_reversals.length ) { // TODO: rmv from UI
                    set_checked( "chkStair", false);
                }
            }

            compute_mean() {
                var revs_last=this.trial_history
                    .filter(t1=>t1.is_reversal)         // extract reversals
                    .filter( (word,idx,arr) => idx>1)   // remove first two

                if (revs_last.length>0) {
                    this.mean_last=revs_last.reduce( (total,t1)=>t1.size+total,0)/revs_last.length
                } else {
                    this.mean_last=-1;
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

                    var trial1={'num':this.stair_trial, 'size':prev_size, 'ori': trial_params['orientation'],
                        'resp': ori_resp, 'is_correct': correct, 'is_reversal': isReversal, 'num_reversals':
                        this.nReversals, 'dir_reversal_down': this.prev_corr, 'x': this.stair_trial, 'y': prev_size};
						// Make aliases for x and y just to make drawing easier

                    this.trial_history.push(trial1);

                    if (trial1.y <1.0) { // TODO: Have a flag whether to plot on log scale!!?
                        if (trial1.y>0) { // Hopefully won't interfere with 0 for Y/N manual acuity
                            trial1.y = Math.log10(trial1.y)*25.0+100.0 
                        };
                    };

                    update_graph(trial1) //this.trial_history[this.trial_history.length-1]);
					app1(this.trial_history); // TODO
                    // Get next one:
                    var oriNew=generate_ori(4) 
                    // Set up trial parameters, which are merged with the code to do 1 trial
                    set_value("trial",`trial_params={\n\torientation: ${oriNew},
                        \n\tsize:${this.stair_size},
                        \n\tcontrast:${this.contrast}
                    }`);

                    // Finished ?
                    if (this.nReversals>=metap.staircase_reversals.length ) {
                        set_checked( "chkStair", false); // TODO: out of UI
                        set_html("lblStair",`FINISHED threshold=${this.mean_last.toPrecision(4)}`);
                        //beep(1,440,80);
                    } else {
                        this.next(); // execute next
                    }
                }
            };
        }

    class MOCS {
            constructor() {
            }

            restart(levels,repeats,nafc) {
                this.levels=levels; 
                this.repeats=repeats;
                this.num_trial=0;
                this.nafc=nafc;

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

                var spac=this.remaining[this.index_which]['which']
                if (spac<10) {
                    var yloc=spac*15; // CC spacings times ten
                } else {
                    var yloc=90;
                }
                var xloc=this.total_remaining()/2.0; // from right to left
                var trial1={'is_correct': correct, 'x': xloc, 'y':yloc };
                update_graph(trial1);

                set_html("lblStair",`MOCS ${this.total_remaining()}`); //TOTAL

                this.remaining[this.index_which]['remaining'] -= 1;
                if (this.remaining[this.index_which]['remaining']==0) {
                    this.remaining.splice(this.index_which,1); // remove 1 item from middle of array
                }

                // Finished ?
                if (this.remaining.length < 1 ) {
                    set_checked( "chkStair", false); // TODO: out of UI
                    set_checked( "chkMOCS", false); // TODO: out of UI
                    set_html("lblStair","FINISHED");
                    //beep(1,440,80);
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


    var num_manual_trial=0;      // trial count
    var prev_answered=false;     // was previous trial answered already?
    var map_size={"1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9,
       "10":10, "11":16, "12":25, "13":40, "14":63, "15":100} // log10 steps

    function manual_trial(which_size,nafc,is_YN) {
        // Get random orientation
        var oriNew=generate_ori(nafc);
        if (is_YN) {oriNew=0}; // for Y/N task, always right-pointed

        // Set up trial parameters, which are merged with the code to do 1 trial
        set_value("trial",`trial_params={\n\torientation: ${oriNew},\n\tsize: ${map_size[which_size]}\n}`);

        do_trial(); // TODO: figure out better place for this

        prev_manual_trial={'ori':oriNew, 'size': which_size};
        prev_answered=false;
        num_manual_trial += 1;
    }

    // TODO: This UI doesn't really belong here
    function update_manual_table_corr(nwhich,correct) {
        var thisid='count_'+nwhich;
        var strCurrent=get_html(thisid);
        var fields=strCurrent.split('/');
        set_html(thisid,(parseInt(fields[0])+correct)+'/'+fields[1]);
    }
    function update_manual_table_outof(nwhich) {
        var thisid='count_'+nwhich;
        var strCurrent=get_html(thisid);
        var fields=strCurrent.split('/');
        set_html(thisid,fields[0]+'/'+(parseInt(fields[1])+1));
    }

    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    function export_manual_table() {
        var s = "";
        s += "size,num_correct,num_presented";
        s += ","+get_value("text_condition") + "\n";
        for (var nrow = nrows_mocs_table; nrow>=0; nrow--) {
            var thisid='count_'+nrow;
            strCurrent=get_html(thisid);
            fields=strCurrent.split('/');
            // Only output cells for which one has been presented
            if (parseInt(fields[1])>0) {
                s+=nrow+","+fields[0]+","+fields[1]+"\n"
            }
        }
        log.info(s)
        set_html("log",s)

        var owner=document.getElementById("table_text") 
        owner.style.display="";
        owner.hidden=false;

        var el=document.getElementById("log") //.select();
        var success= iosCopyToClipboard(el);
        //success=navigator.clipboard.writeText(s);

        owner.style.display="none";
        owner.hidden=true;
    }

    function iosCopyToClipboard(el) {
        var range = document.createRange();

        el.contentEditable = true;
        el.readOnly = false;
        el.focus()
        el.select()
        range.selectNodeContents(el);

        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);

        el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

        document.execCommand('copy');
    }

    function process_manual(ori_resp, is_YN,allow_multiple) {
        if ((!allow_multiple) && prev_answered) {
            return;
        } // noop if they already responded to this trial.
        
        prev_answered=true; // ...now they have!

        var correct=(ori_resp==prev_manual_trial['ori']);
        var nwhich=prev_manual_trial['size'];
        if (is_YN) {
            if (nwhich==0 && ori_resp==180) { // for Y/N trials, left&absent is correct,
                correct=true;
            } else {
                if(nwhich!=0 && ori_resp==0) { // right&present is correct
                    correct=true;
                } else {
                    correct=false;
                };
            }
        };
        log.info(correct);
        update_manual_table_corr(nwhich,correct);

        // Rescale our linear indexed scale (0-15) to the actual size scale, although sizes won't correspond
        // Button one is a phantom button to leave space
        var ylocGraph=(nwhich)*98/15.0
        var trial1={'is_correct': correct, 'x': num_manual_trial-1, 'y':ylocGraph };
        update_graph(trial1);
        //app1(this.trial_history); // TODO
    }
