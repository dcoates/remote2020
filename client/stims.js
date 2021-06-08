'use strict';
                var scale=0.1;
                const GAMMA=1.0;
                const INVGAMMA=1/GAMMA;
                
                function clear1(colr) {
                    ctx.fillStyle = colr;
                    ctx.fillRect(0, 0, wid, height);
				}

                function clear(colr) {
                    //ctx.fillStyle = colr;
                    //ctx.fillRect(0, 0, wid, height);

                    //ctx.fillStyle = "rgba(0,0,0,0)"; // set to transparent alpha
                    //ctx.fillRect(0, 0, wid, height);
					// Clear everyone on the target canvas:
                    ctx.clearRect(0, 0, wid, height);
                    ctx.fillStyle = colr;

					// TODO. This only works for crowding, will break others
                    ctx_background.fillStyle = colr;
                    ctx_background.fillRect(0, 0, wid, height);
                }

                var val; //global for debuggin
				const con_background=0.5;
				var d;

                // https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast/34203206#34203206
                function contrastImage(imgData, contrast){  //input range 0..1
						d = imgData.data;
						document.imdat=d;
						var d0 = d[0];
                        for(var i=0;i<d.length;i+=4){   //r,g,b,a
                            val=d[i];
							var newval;
							var alpha=128;
                            if (val==255)  {   
								// Pixels are the target/foreground
                                newval=(con_background+2*contrast*con_background);  			    // value is incr. above background

								//Noisy bit:
                                val=Math.floor( (newval*255.0)+Math.random()-0.5); // apply noisy bit

								// Gamma correct:
                                val=255.0*Math.pow(val/255.0, INVGAMMA);

								// Clamp
                                newval=Math.max(0,Math.min(val,255)); 
                                //val=parseInt(newval);              
                            } else {
								newval=255.0*Math.pow(con_background, INVGAMMA);
								alpha=0;
								//newval=newval / 2.0;
							};

							d[i] = newval;
							d[i+1] = newval;
							d[i+2] = newval;
							d[i+3] = alpha;
                        }
						//console.warn(d[0],d0,contrast);
                        return imgData;
                }

                const image = new Image();
                image.src = 'img/tumbling_e_white.png'
                const image_e = new Image();
                image_e.src = 'img/tumbling_e_white.png'
                const image_e_flanker = new Image();
                image_e_flanker.src = 'img/tumbling_e_white.png'
                const image_v = new Image();
                image_v.src = 'img/vernier.png'

                const image_noise0 = new Image();
                image_noise0.src = 'img/noise0.png'
                const image_noise1 = new Image();
                image_noise1.src = 'img/noise1.png'
                const image_noise2 = new Image();
                image_noise2.src = 'img/noise2.png'
                const image_noise3 = new Image();
                image_noise3.src = 'img/noise3.png'
                const image_noise4 = new Image();
                image_noise4.src = 'img/noise4.png'
				var im_noises=[image_noise0,image_noise1,image_noise2,image_noise3,image_noise4];

                const image_phased0 = new Image();
                image_phased0.src = 'img/phased0.png'
                const image_phased1 = new Image();
                image_phased1.src = 'img/phased1.png'
                const image_phased2 = new Image();
                image_phased2.src = 'img/phased2.png'
                const image_phased3 = new Image();
                image_phased3.src = 'img/phased3.png'
                const image_phased4 = new Image();
                image_phased4.src = 'img/phased4.png'
				var im_phaseds=[image_phased0,image_phased1,image_phased2,image_phased3,image_phased4];

                const image_phased_full0 = new Image();
                image_phased_full0.src = 'img/letter_full0.png'
				var im_pfull=[image_phased_full0];

                const image_spot = new Image();
                image_spot.src = 'img/spot.png'

				const TO_RADIANS = Math.PI/180; 

                // Assume 100% contrast. Stub for compatibility
                function draw_e(posx,posy,siz,rotation) {
                    draw_e_contrast(ctx,image_e,posx,posy,siz,rotation,1.0);
                }

                function draw_flanker(posx,posy,str,siz,contrast,img_target) {
					if (str == '_') { //NOOP
						return;
					}
					var code=str.charCodeAt(0);
					//console.log(str,code);
                    if (parseInt(str)>=0) {
						var rota=(parseInt(str)%4)*90
						if (parseInt(str)<4) {
                        	draw_e_contrast(ctx,image_e_flanker,posx,posy,siz,rota,0.2);
						} else if (parseInt(str)<8){
                        	draw_e_contrast(ctx,image_e_flanker,posx,posy,siz,rota,-0.2);
						}else{
                        	draw_e_contrast(ctx,image_e_flanker,posx,posy,siz,rota,contrast);
						}
					} else {
						if ( (code>='a'.charCodeAt(0)) & (code<='z'.charCodeAt(0)) ) {
							if (code<='p'.charCodeAt(0))  { // Letter noise
								var noise_num=str.charCodeAt(0)-'a'.charCodeAt(0);
								var noise_rot=noise_num % 4;
								var noise_which=Math.floor(noise_num/4);
								var imX=im_noises[noise_which];
								//console.log(noise_num,noise_rot,noise_which);
                        		draw_e_contrast(ctx,imX,posx,posy,siz,noise_rot*90,1.0); // Contrast correction already in image (con=1.0)
							} else if (code<'w'.charCodeAt(0))  { // s,t,u,v: yoked E flankers
								var noise_num=str.charCodeAt(0)-'s'.charCodeAt(0);
								var rot=noise_num % 4;
								var rad=posx-siz/2
								draw_e_contrast(ctx,image_e_flanker,posx,posy,siz,rot*90,contrast);
							} else if (code<='z'.charCodeAt(0)) { // code==w,x,y,z : full-screen noise
								var noise_num=str.charCodeAt(0)-'w'.charCodeAt(0);
								var noise_rot=noise_num % 4;
								var noise_which=Math.floor(noise_num/4);
								var imX=im_pfull[0];
								//console.log(noise_num,noise_rot,noise_which);
								// Centered and draw large:
                        		draw_e_contrast(ctx_background,imX,0,0,siz*8,noise_rot*90,1.0); // Contrast correction already in image (con=1.0)
							}
						} else if ( (code>='A'.charCodeAt(0)) & (code<='Z'.charCodeAt(0)) ) {
							if (code<='P'.charCodeAt(0))  {
								var noise_num=str.charCodeAt(0)-'A'.charCodeAt(0);
								var noise_rot=noise_num % 4;
								var noise_which=Math.floor(noise_num/4);
								console.log(code, noise_num,noise_rot,noise_which);
								var imX=im_phaseds[noise_which];

								document.imX=imX;

								draw_e_contrast(ctx,imX,posx,posy,siz,noise_rot*90,1.0); // Contrast correction already in image (con=1.0)
							} else if (code<'W'.charCodeAt(0))  { // S,T,U,V: overlapping (donut hole)
								var noise_num=str.charCodeAt(0)-'S'.charCodeAt(0);
								var noise_rot=noise_num % 4;
								var noise_which=Math.floor(noise_num/4);
								var imX=im_pfull[0];
								var rad=posx-siz/2
                        		draw_e_contrast_subset(ctx_background,imX,0,0,rad*2,noise_rot*90,1.0,siz); // Contrast correction already in image (con=1.0)

							} else { // W,X,Y,Z: donut
								var noise_num=str.charCodeAt(0)-'W'.charCodeAt(0);
								var noise_rot=noise_num % 4;
								var noise_which=Math.floor(noise_num/4);
								var imX=im_pfull[0];

								//console.log(noise_num,noise_rot,noise_which);
								// Centered and draw large:
                        		draw_e_contrast(ctx_background,imX,0,0,siz*8,noise_rot*90,1.0); // Contrast correction already in image (con=1.0)

								console.log(posx,posy,siz);
								var rad=posx-siz/2
								// Draw a gray box in the foreground
                    			ctx_background.fillStyle = "rgba(con_background,con_background,con_background,255)"; // set to transparent alpha
                    			ctx_background.fillRect(xc-rad, yc-rad, rad*2,rad*2);
							}
						} else {
							// Letter flanker
							//draw_string(posx,posy+siz/2.0,str,siz);
							; // something weird/unknown
						}
					}
                }

                function draw_string(posx,posy,str,siz) {
                    ctx.fillStyle="#000000";
                    var newFont=siz+'px Sloan';
                    ctx.font=newFont;
                    ctx.textAlign="center";
                    ctx.fillText(str,xc+posx,yc+posy);
                }

                function draw_e_contrast(ctx_dest,imx,posx,posy,siz,rotation,contrast) {
                    ctx_dest.imageSmoothingEnabled=false;
					//ctx.save(); 
					ctx_dest.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					ctx_dest.rotate(-rotation * TO_RADIANS); // this is clockwise. We want typical polar (90 is straight up)

					ctx_dest.drawImage(imx, -siz/2, -siz/2, siz, siz);

                    ctx_dest.resetTransform();

					if (contrast<1.0) {
                    	var imgData=ctx_dest.getImageData(posx+xc-siz/2-1,posy+yc-siz/2-1, siz+3, siz+3);
                    	ctx_dest.putImageData( contrastImage(imgData,contrast), posx+xc-siz/2-1,posy+yc-siz/2-1);
					}
				}

                function draw_e_contrast_subset(ctx_dest,imx,posx,posy,siz,rotation,contrast,letter_size) {
                    ctx_dest.imageSmoothingEnabled=false;
					//ctx.save(); 
					ctx_dest.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					ctx_dest.rotate(-rotation * TO_RADIANS); // this is clockwise. We want typical polar (90 is straight up)

					ctx_dest.drawImage(imx, 0, 0, letter_size*8, letter_size*5, -siz/2, -siz/2, siz, siz);

                    ctx_dest.resetTransform();

					if (contrast<1.0) {
                    	var imgData=ctx_dest.getImageData(posx+xc-siz/2-1,posy+yc-siz/2-1, siz+3, siz+3);
                    	ctx_dest.putImageData( contrastImage(imgData,contrast), posx+xc-siz/2-1,posy+yc-siz/2-1);
					}
				}

                // Pass in arbitrary image as "i"
                function draw_i_contrast(i,posx,posy,siz,rotation,contrast) {
                    ctx.imageSmoothingEnabled=false;
					//ctx.save(); 
					ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					ctx.rotate(-rotation * TO_RADIANS); // this is clockwise. We want typical polar (90 is straight up)
					ctx.drawImage(i, -siz/2, -siz/2, siz, siz);
                    ctx.resetTransform();
    				//ctx.restore(); 
                    
					// Just modify the region containing the letter, not the whole canvas
                    var imgData=ctx.getImageData(posx+xc-siz/2-1,posy+yc-siz/2-1, siz+3, siz+3);
                    ctx.putImageData( contrastImage(imgData,contrast), posx+xc-siz/2-1,posy+yc-siz/2-1);
                }

                function draw_v_contrast(posx,posy,siz,rotation,contrast) {
                    ctx.imageSmoothingEnabled=false;
					//ctx.save(); 
                    if (rotation==0) {
					    ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					    ctx.drawImage(image_v, -siz/2, -siz/2, siz, siz);
                    } else {
					    ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
                        ctx.translate(image_v.width,0); // Redundant??!
                        ctx.scale(-1,1);
					    ctx.drawImage(image_v, -siz/2, -siz/2, siz, siz);
                    }
                    ctx.resetTransform();
    				//ctx.restore(); 
                    
                    var imgData=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
                    ctx.putImageData( contrastImage(imgData,contrast), 0, 0 );
                }

                function draw_spot_contrast(posx,posy,siz,rotation,contrast) {
                    ctx.imageSmoothingEnabled=false;
					//ctx.save(); 
                    ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin

                    if (rotation==0) {
					    ctx.setTransform(1.0, 0, 0, 1.0, posx+xc, posy+yc); // sets scale and origin
					    ctx.drawImage(image_spot, -siz/2, -siz/2, siz, siz);
					    //ctx.drawImage(image_v, -siz/2, -siz/2, siz, siz);
                    } else {
                        ; //noop: don't draw
                    }

                    ctx.resetTransform();
    				//ctx.restore(); 
                    
                    var imgData=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
                    ctx.putImageData( contrastImage(imgData,contrast), 0, 0 );
                }

                // Assume 100% contrast. Stub for compatibility
                function draw_letter(which,ori,posx,posy,siz,color,barsep,esep,flankers) {
                    draw_letter2(which,ori,posx,posy,siz,color,barsep,esep,1.0,flankers);
                }

                // This one takes the contrast
                function draw_letter2(which,ori,posx,posy,siz,color,barsep,esep,contrast,flankers) {
                    if (siz==0) {return;} // make sure noop for size 0, and no weirdness

					var target=image_e;
					if (which=='U') {
						target=image_u;
					} else if (which=='T') {
						target=image_t;
					}

					// Draw flankers first, like for fullscreen one
                    if (esep>=0) {
						var im_flanker=image_noise0; // TODO
						draw_flanker(posx +siz*5*esep,posy,flankers[0],siz*5,contrast,im_flanker);
						draw_flanker(posx,-siz*5*esep+posy,flankers[1],siz*5,contrast,im_flanker);
						draw_flanker(posx -siz*5*esep,posy,flankers[2],siz*5,contrast,im_flanker);
						draw_flanker(posx,+siz*5*esep+posy,flankers[3],siz*5,contrast,im_flanker);
                    }

                    if (which=='E' || which=='U' || which=='T') {
							draw_i_contrast(target,posx,posy,siz*5.0,ori,contrast);
                    } else if (which=='|') {
                            // Image for vernier is bigger to allow lines to be longer
							draw_v_contrast(posx,posy,siz*20.0,ori,contrast);
                    } else if (which=='.') {
                            // Image for vernier is bigger to allow lines to be longer
							draw_spot_contrast(posx,posy,siz*1.0,ori,contrast);
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

