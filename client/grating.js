        //<canvas id="canvas" style="width:1600px, height:1200px">  initial-scale:1.0">

        // S6: 2560x1440

        //<meta name="viewport" content="width=device-width, initial-scale=1.0">
            function cool() {
                cancelAnimationFrame(globalID);
                return 0;
            }

            var anim_frames=10;
            var duration_frames=20;
            var fram=0;
            var fram_total=0;
            var dst = new ArrayBuffer(myw*myh);

            function animate_grating() {
                // http://bl.ocks.org/biovisualize/5400576
                //stats.begin()
                pix1=getRandomInt(256);

                //var ptr = new DataView(bufBigTest, 0, myw*myh);
                //data32=ptr;
                new Uint8Array(dst).set(bufBigTest);

                //var buf8T = buf8Tb.slice(fram*myw*myh*4,((fram+1)*myw*myh)*4)

                var buf8T = buf8Tb.subarray(fram*myw*myh*4,((fram+1)*myw*myh)*4);

                imageData.data.set(buf8T);
                ctx.putImageData(imageData, 0, 0);
                //stats.end()

                fram=(fram+1)%(anim_frames-1)+1;

                //document.getElementById("canvas").style.transform = "rotate(22deg)";
                
                fram_total += 1;

                /*
                if (fram_total<duration_frames) {
                    //globalID = requestAnimationFrame(animator);

                } else {
                    fram_total=0;
                    cancelAnimationFrame(globalID);
                    var elem = document.getElementById("canvas");
                    //document.exitFullscreen()
                    //
                    // Erase:
                    var buf8T = buf8Tb.subarray(0*myw*myh*4,((0+1)*myw*myh)*4);
                    imageData.data.set(buf8T);
                    ctx.putImageData(imageData, 0, 0);
                }
                */
            }

            function do_grating() {
                var elem = document.getElementById("canvas");
                globalID = requestAnimationFrame(animator);
            }

            function createCanvas(h, w) {
                //var c = document.createElement("canvas");
                var c = document.getElementById("canvas");
                //c.width = w;
                //c.height = h;
                return c;
            }

            function augmentImageData(o) {
                o.getPixel = function (x, y) {
                    var i = (x + y * this.width) * 4;
                    return {R: this.data[i],
                        G: this.data[i + 1],
                        B: this.data[i + 2],
                        A: this.data[i + 3]
                    };
                };
                o.setPixel = function (x, y, c) {
                    var i = (x + y * this.width) * 4;
                    this.data[i] = c.R;
                    this.data[i + 1] = c.G;
                    this.data[i + 2] = c.B;
                    this.data[i + 3] = c.A;
                };
            }
            ;

            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

            var myw=vw-20; // scroll bars
            var myh=vh-20;

            myw=256; 
            myh=256; 

            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");
            //var ctx = document.body.appendChild(createCanvas(myh, myw)).getContext("2d");
            //var ImDat = ctx.createImageData(myw, myh);
            //augmentImageData(ImDat);

            // STATS PANEL
            //var stats = new Stats();
            //stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
            //stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
            //document.body.appendChild( stats.dom );

            var imageData = ctx.getImageData(0, 0, myw, myh);
            var buf = new ArrayBuffer(imageData.data.length);
            var buf8 = new Uint8ClampedArray(buf);
            var data32 = new Uint32Array(buf);

            var bufBigTest = new ArrayBuffer(imageData.data.length*anim_frames);
            var dataT = new Uint32Array(bufBigTest);
            var buf8Tb = new Uint8ClampedArray(bufBigTest);

            // Make a buffer with a mapping of 256 gray values
            var buf_grays = new ArrayBuffer(256*4);
            var dataG = new Uint32Array(buf_grays);
            for (var level=0; level<256; level++) {
                dataG[level] = 
                    (255   << 24) |    // alpha
                    (level << 16) |    // blue
                    (level  <<  8) |    // green
                    level;            // red
            }

            function make_grating(sf,contr,radius) {
            stats.begin()
            //for (var pixelt=0; pixelt<myw*myh*anim_frames; pixelt++) {
            var cx=myw/2;
            var cy=myh/2;
            var radius2=radius*radius;
            fcon=parseFloat(contr);
            sf=parseFloat(sf);
            for (var x=0; x<myw; x++) {
                //pixN=(getRandomInt(2)*2-1)*1; // -1 or 1
                //pixel_loc=pixelt%(myw*myh)
                //xval=pixel_loc%myw;
                //xval=x;
                //yval=Math.floor(pixel_loc/myw);
                valu=Math.sin(2*Math.PI*x/myw*sf)*fcon;

                // The order of variables does seem to matter for performance
                for (var fram=0; fram<anim_frames; fram++) {
                for (var y=0; y<myh; y++) {

                if ((cx-x)*(cx-x)+(cy-y)*(cy-y)>radius2){
                    fval=0;
                } else {
                    fval=valu;
                }

                if (fram==0){
                    fval=0;
                }

                r1=Math.random()
                //r2=r1
                //r3=r1
                pix1=fval+r1-0.5;
                pix1b=Math.floor(pix1+128);
                r2=Math.random()
                pix2=fval+r2-0.5;
                pix2b=pix1b; //Math.floor(pix2+128);
                r3=Math.random()
                pix3=fval+r3-0.5;
                pix3b=pix1b; //Math.floor(pix3+128);

                pixelt=fram*myw*myh+y*myw+x;
                dataT[pixelt]= (255<<24) | // alpha
                    (pix3b << 16) |    // blue
                    (pix2b  <<  8) |    // green
                    pix1b;            // red
                }
            }
            }

            // Do once, to unlazy-fy
            animate_grating();
            fram=0;
            fram_total=0;
            stats.end();
            }
