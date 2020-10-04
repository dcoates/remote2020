'use strict';
                var scale=0.1;
                const GAMMA=2.4;
                
                function clear(colr) {
                    ctx.fillStyle = colr;
                    ctx.fillRect(0, 0, wid, height);
                }

                var val; //global for debuggin
                // https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast/34203206#34203206
                function contrastImage(imgData, contrast){  //input range 0..1
                        var d = imgData.data;
                        for(var i=0;i<d.length;i+=4){   //r,g,b,a
                            val=d[i];
                            if (val<255)  {   
                                val=(255.0-val)/255.0;           // convert pix from 0..255 to 1..0 (tested: pix=0.0 or 1.0)
                                val=val*contrast;               // apply contrast
                                val=1.0-val;                    // we are using negative contrast
                                val=Math.floor( (val*255.0)+Math.random()-0.5); // apply noisy bit
                                val=255.0*Math.pow(val/255.0, GAMMA); // approx. gamma correct
                                val=Math.max(0,Math.min(val,255));  // clamp to 0..255
                                val=parseInt(val);              
                            };
                            d[i] = val;
                            d[i+1] = val;
                            d[i+2] = val;
                        }
                        return imgData;
                }

                const image = new Image();
                image.src = 'img/tumbling_e.png'

				const TO_RADIANS = Math.PI/180; 

                // Assume 100% contrast. Stub for compatibility
                function draw_e(posx,posy,siz,rotation) {
                    draw_e_contrast(posx,posy,siz,rotation,1.0);
                }

                function draw_e_contrast(posx,posy,siz,rotation,contrast) {
                    ctx.imageSmoothingEnabled=false;
					//ctx.save(); 
					ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					ctx.rotate(-rotation * TO_RADIANS); // this is clockwise. We want typical polar (90 is straight up)
					ctx.drawImage(image, -siz/2, -siz/2, siz, siz);
                    ctx.resetTransform();
    				//ctx.restore(); 
                    
                    var imgData=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
                    ctx.putImageData( contrastImage(imgData,contrast), 0, 0 );
                }

                // Assume 100% contrast. Stub for compatibility
                function draw_letter(which,ori,posx,posy,siz,color,barsep,esep) {
                    draw_letter2(which,ori,posx,posy,siz,color,barsep,esep,1.0);
                }

                // This one takes the contrast
                function draw_letter2(which,ori,posx,posy,siz,color,barsep,esep,contrast) {
                    if (siz==0) {return;} // make sure noop for size 0, and no weirdness

                    if (which=='E') {
							draw_e_contrast(posx,posy,siz*5.0,ori,contrast);
                       }
                    if (esep>=0) {
							draw_e_contrast(posx-siz*5*esep,posy,siz*5,90,contrast);
							draw_e_contrast(posx+siz*5*esep,posy,siz*5,0,contrast);
							draw_e_contrast(posx,-siz*5*esep+posy,siz*5,180,contrast);
							draw_e_contrast(posx,+siz*5*esep+posy,siz*5,270,contrast);
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

                function fixation(x,y,siz,wid,colr,style) {
                    ctx.beginPath();
                    ctx.lineWidth=wid;
                    ctx.strokeStyle=colr;
                    if (style!="+") {
                        ctx.moveTo(x+xc+siz, y+yc+siz);
                        ctx.lineTo(x+xc+siz/2.0, y+yc+siz/2.0);

                        ctx.moveTo(x+xc-siz, y+yc+siz);
                        ctx.lineTo(x+xc-siz/2.0, y+yc+siz/2.0);

                        ctx.moveTo(x+xc-siz, y+yc-siz);
                        ctx.lineTo(x+xc-siz/2.0, y+yc-siz/2.0);

                        ctx.moveTo(x+xc+siz, y+yc-siz);
                        ctx.lineTo(x+xc+siz/2.0, y+yc-siz/2.0);
                    } else {
                        ctx.moveTo(x+xc, y+yc-siz);
                        ctx.lineTo(x+xc, y+yc+siz);
                        ctx.moveTo(x+xc-siz, y+yc);
                        ctx.lineTo(x+xc+siz, y+yc);
                    }
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


var canvVis=document.getElementById("canvas2");
var canvTemp=document.createElement('canvas','canvas_render')
function resizeTo(canvas,pct){
	/* https://stackoverflow.com/questions/34866171/resize-html-canvas-with-scale */
	var ctx_vis=canvVis.getContext("2d");

	// Get from main "canvas" which is visible, but just for rendering by main program
	// grab out of this, into canvTemp. Then draw this on the (visible) canvVis
	var cw=canvas.width;
	var ch=canvas.height;
	canvTemp.width=cw;
	canvTemp.height=ch;
	var ctx_temp=canvTemp.getContext("2d");

	var frac_w=canvVis.width/canvas.width
	var frac_h=canvVis.height/canvas.height 
	var shrink=1;
	if (frac_w<frac_h) {
		shrink=frac_w;
	} else {
		shrink=frac_h;
	}
	ctx_temp.drawImage(canvas,0,0);
	//canvas.width*=pct;
	//canvas.height*=pct;
	//ctx.clearRect(0,0,cw,ch);

	// center image of pair on display
	var x_center=canvVis.width/2-canvas.width*shrink/2 
	var y_center=canvVis.height/2-canvas.height*shrink/2 
	ctx_vis.drawImage(canvTemp,x_center,y_center,cw*shrink,ch*shrink);
	}

