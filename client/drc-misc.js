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

