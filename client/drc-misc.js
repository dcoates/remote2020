fillTemplate = function (templateString, templateVars) {
    var parsed = templateString;
    Object.keys(templateVars).forEach(
        (key) => {
            const value = templateVars[key]
            parsed = parsed.replace('${'+key+'}',value)
        }
    )
    return parsed
}

function set_html(html,value) {
    document.getElementById(html).innerHTML=value;
}

function set_value(html,value) {
    document.getElementById(html).value=value;
}

function set_checked(html,value) {
    document.getElementById(html).checked=value;
}

function get_html(html) {
    return document.getElementById(html).innerHTML;
}


function get_value(html) {
    return document.getElementById(html).value;
}
function get_checked(html,value) {
    return document.getElementById(html).checked;
}


function beep(vol, freq, duration){

    return; 

    if (false) {
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
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Test browser support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

var track = null;

function set_torch(mode) {
if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(devices => {
  
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      throw 'No camera found on this device.';
    }
    const camera = cameras[cameras.length - 1];

    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: camera.deviceId,
        facingMode: ['user', 'environment'],
        height: {ideal: 1080},
        width: {ideal: 1920}
      }
    }).then(stream => {
      if (track==null) {
      	track = stream.getVideoTracks()[0];
      };

      //Create image capture object and get camera capabilities
      const imageCapture = new ImageCapture(track)
      const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

        //todo: check if camera has a torch

        //let there be light!
        //const btn = document.querySelector('.switch');
        //btn.addEventListener('click', function(){
          track.applyConstraints({
            advanced: [{torch: mode}]
          });
      //});
    });
  });
  //The light will be on as long the track exists
});
}};
