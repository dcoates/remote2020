                //ctx.imageSmoothingEnabled=false;
                //console.log(ctx.imageSmoothingEnabled);

                function clear(colr) {
                    ctx.fillStyle = colr;
                    ctx.fillRect(0, 0, wid, height);
                }

                function draw_letter(which,ori,posx,posy,siz,color) {
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
                    }
                }

                function fixation(siz,wid,colr) {
                    ctx.beginPath();
                    ctx.lineWidth=wid;
                    ctx.strokeStyle=colr;
                    ctx.moveTo(xc, yc-siz);
                    ctx.lineTo(xc, yc+siz);
                    ctx.moveTo(xc-siz, yc);
                    ctx.lineTo(xc+siz, yc);
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

