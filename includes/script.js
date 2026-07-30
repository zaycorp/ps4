let timerId = null; 
const label = document.getElementById('autoJbLabel');
const label2 = document.getElementById('autoJbLabel2');
const label3 = document.getElementById('autoJbLabel3');
const checkbox = document.getElementById('autoJbInput');
const checkbox2 = document.getElementById('autoJbInput2');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");

const storedAutoJb = localStorage.getItem("autoJb");
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// choose one of kernel exploits
var exploitChain = localStorage.getItem("exploitChain") || "lapse";
const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById('kernel-options');

// Show user agent
UAElement.innerText += " " + navigator.userAgent;

kexForm.addEventListener("change", function (event) {
    localStorage.setItem("exploitChain", event.target.value);
    exploitChain = event.target.value;
});

// jailbreak execution
jeilbrekBtn.addEventListener("click", function (e){
    jeilbrekBtn.disabled = true;
    stopInterval();
    doJb();
});

checkbox2.addEventListener('change', function () {
    localStorage.setItem("autoJb", checkbox2.checked);
    if (checkbox2.checked == true && jeilbrekBtn.disabled == false) {
        jailbreakCountdown();
		label3.textContent = "Auto Jailbreak";
        return;
    }
	label3.textContent = "Manual Jailbreak";
    stopInterval();
});

function stopInterval(){
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
  		  
}

function jailbreakCountdown() {   
    stopInterval();

    let countdown = 5;
    label2.textContent = `${countdown}`;
    timerId = setInterval(() => {
        countdown--;
        label2.textContent = `${countdown}`;

        if (countdown < 0) {
            jeilbrekBtn.disabled = true; 
            clearInterval(timerId);
            timerId = null;
            label2.textContent = 'Executing';
            doJb();
        }
    }, 1000);
}

function cacheProgress(e) {
    var Percent = (Math.round(e.loaded / e.total * 100));
    document.title = "Caching: " + Percent + "%";
}

function displayCacheProgress() {
    setTimeout(function () {
        // show a tick
        document.title = "\u2713";
    }, 1000);
    setTimeout(function () {
        // location.reload();
        document.title = "CSSFontFace exploit";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cache handling
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function (e) { displayCacheProgress(); };
        window.applicationCache.onupdateready = function (e) { displayCacheProgress(); };
    }

    // choose prefered exploit chain
    if (exploitChain == "netctrl") {
        netctrlRadio.checked = true;
    } else {
        lapseRadio.checked = true;
    }
	
	    // choose prefered exploit chain
    if (autoJbValue == true) {
        label3.textContent = "Auto Jailbreak";
    } else {
        label3.textContent = "Manual Jailbreak";
    }

    // apply autojb localStorage value
    checkbox2.checked = autoJbValue;

    if (autoJbValue) jailbreakCountdown();
});