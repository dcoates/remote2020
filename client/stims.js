                function clear(colr) {
                    ctx.fillStyle = colr;
                    ctx.fillRect(0, 0, wid, height);
                }

                const image = new Image();
                image.src = './tumbling_e.png'

				const TO_RADIANS = Math.PI/180; 
                function draw_e(posx,posy,siz,rotation) {
                    ctx.imageSmoothingEnabled=false;
					ctx.save(); 
					const scale=1;
					ctx.setTransform(scale, 0, 0, scale, posx+xc, posy+yc); // sets scale and origin
					ctx.rotate(-rotation * TO_RADIANS); // this is clockwise. We want typical polar (90 is straight up)
					ctx.drawImage(image, -siz/2, -siz/2, siz, siz);
                    ctx.resetTransform();
    				ctx.restore(); 
                }

                function draw_letter(which,ori,posx,posy,siz,color,barsep,esep) {
                    if (which=='E') {
							draw_e(posx,posy,siz*5.0,ori);
                       }
                    if (esep>=0) {
							draw_e(posx-siz*5*esep,posy,siz*5,90);
							draw_e(posx+siz*5*esep,posy,siz*5,0);
							draw_e(posx,-siz*5*esep+posy,siz*5,180);
							draw_e(posx,+siz*5*esep+posy,siz*5,270);
                    }
                    if (barsep>=0) { // TODO: Untested; not centered well?
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
        function square(sid,colr) {
            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");
            var wid=canvas.width;
            var height=canvas.height;

            ctx.fillStyle = colr;

            // Center it
            ctx.fillRect(wid/2-sid/2, height/2-sid/2, sid, sid);
            };

