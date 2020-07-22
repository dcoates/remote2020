                //ctx.imageSmoothingEnabled=false;
                //console.log(ctx.imageSmoothingEnabled);

                function clear(colr) {
                    ctx.fillStyle = colr;
                    ctx.fillRect(0, 0, wid, height);
                }

                function draw_letter(which,ori,posx,posy,siz,color,barsep,esep) {
                    siz=Math.ceil(siz);
                    if (which=='E') {
                       switch (ori) {
                        case 0:
                            right(posx,posy,siz,color);
                            break;
                        case 90:
                            up(posx,posy,siz,color);
                            break;
                        case 180:
                            left(posx,posy,siz,color);
                            break;
                        case 270:
                            down(posx,posy,siz,color);
                            break;
                       }
                    //if (document.getElementById("chkEFlanked").checked) {
                    if (esep>=0) {
                            right(posx-siz*esep,posy,siz,color);
                            left(posx+siz*esep,posy,siz,color);
                            up(posx,posy-siz*esep,siz,color);
                            down(posx,posy+siz*esep,siz,color);
                    }
                    //if (document.getElementById("chkFlanked").checked) {
                    if (barsep>=0) {
                        ctx.beginPath();
                        ctx.lineWidth=siz;
                        ctx.strokeStyle=color;
                        ctx.moveTo(xc-siz*barsep+posx, yc-siz*barsep/2.0+posy);
                        ctx.lineTo(xc-siz*barsep+posx, yc+siz*barsep/2.0+posy);

                        ctx.moveTo(xc+siz*barsep+posx, yc-siz*barsep/2.0+posy);
                        ctx.lineTo(xc+siz*barsep+posx, yc+siz*barsep/2.0+posy);

                        ctx.moveTo(xc-siz*barsep/2.0+posx, yc-siz*barsep+posy);
                        ctx.lineTo(xc+siz*barsep/2.0+posx, yc-siz*barsep+posy);

                        ctx.moveTo(xc-siz*barsep/2.0+posx, yc+siz*barsep+siz+posy);
                        ctx.lineTo(xc+siz*barsep/2.0+posx, yc+siz*barsep+siz+posy);
                        ctx.stroke()
                    }
                }
                }

                function fixation(x,y,siz,wid,colr) {
                    ctx.beginPath();
                    ctx.lineWidth=wid;
                    ctx.strokeStyle=colr;
                    ctx.moveTo(x+xc, y+yc-siz);
                    ctx.lineTo(x+xc, y+yc+siz);
                    ctx.moveTo(x+xc-siz, y+yc);
                    ctx.lineTo(x+xc+siz, y+yc);
                    ctx.stroke()
                }

                function up(posx,posy,bar,colr) {
                    ctx.beginPath();
                    ctx.lineWidth=bar;
                    ctx.strokeStyle=colr;
                    ctx.moveTo(xc-bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc+bar*2.5+posy);
                    ctx.lineTo(xc+bar*2+posx, yc+bar*2.5+posy);
                    ctx.lineTo(xc+bar*2+posx, yc-bar*2+posy);
                    ctx.moveTo(xc+posx, yc-bar*2+posy);
                    ctx.lineTo(xc+posx, yc+bar*2.5+posy);
                    ctx.stroke()
                };

                function down(posx,posy,bar,colr) {
                    ctx.beginPath();
                    ctx.moveTo(xc+bar*2+posx, yc+bar*2.5+posy);
                    ctx.lineTo(xc+bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc+bar*2.5+posy);
                    ctx.moveTo(xc+posx, yc-bar*2+posy);
                    ctx.lineTo(xc+posx, yc+bar*2.5+posy);
                    ctx.lineWidth=bar;
                    ctx.strokeStyle=colr;
                    ctx.stroke()
                };

                function left(posx,posy,bar,colr) {
                    ctx.beginPath();
                    ctx.moveTo(xc-bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc+bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc+bar*2+posx, yc+bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc+bar*2+posy);
                    ctx.moveTo(xc-bar*2+posx,yc+posy);
                    ctx.lineTo(xc+bar*2+posx,yc+posy);

                    ctx.lineWidth=bar;
                    ctx.strokeStyle=colr;
                    ctx.stroke()
                };

                function right(posx,posy,bar,colr) {
                    ctx.beginPath();
                    ctx.moveTo(xc+bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc-bar*2+posy);
                    ctx.lineTo(xc-bar*2+posx, yc+bar*2+posy);
                    ctx.lineTo(xc+bar*2+posx, yc+bar*2+posy);
                    ctx.moveTo(xc+bar*2+posx,yc+posy);
                    ctx.lineTo(xc-bar*2+posx,yc+posy);

                    ctx.lineWidth=bar;
                    ctx.strokeStyle=colr;
                    ctx.stroke()
                };

            function beep(vol, freq, duration){
                o=audio.createOscillator()
                o.frequency.value=freq
                o.type="sine"

                g=audio.createGain()
                g.gain.value=vol*0.01
                o.connect(g)

                g.connect(audio.destination)
                o.start(audio.currentTime)
                o.stop(audio.currentTime+duration*0.001)
            }

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

