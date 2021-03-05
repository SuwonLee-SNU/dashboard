const clock = document.querySelector(".clock");
const AMPM = document.querySelector('.noon-indicator');
const modeChangeBtn = document.querySelector(".indication-mode-change-button");

// Clock display mode:
// A-mode: hh:mm:ss (24 hours)
// B-mode: hh:mm (24 hours)
// C-mode: hh:mm:ss (12 hours)
// D-mode: hh:mm (12 hours)

function updateClock () {
    // Get the time
    const format = (v) => {
        const s = "00" + v;
        return s.substr(s.length-2, 2);
    }
    const format12 = (v) => {
        let s = [];
        if (Number(v) > 12) {
            s = "00" + (v-12);
            AMPM.innerText = 'PM';
        } else {
            s = "00" + v;
            AMPM.innerText = 'PM';
        }
        return s.substr(s.length-2, 2);
    }
    const d = new Date();
    const [h,m,s] = [d.getHours(),d.getMinutes(),d.getSeconds()];
    
    // Check mode and set the clock
    const currentMode = clock.getAttribute('mode');
    let timeDisplay = [];
    if (currentMode === 'A') {
        timeDisplay =  `${format(h)}:${format(m)}:${format(s)}`;
        AMPM.classList.remove('visible');
        AMPM.classList.add('invisible');
    } else if (currentMode === 'B') {
        timeDisplay =  `${format(h)}:${format(m)}`;
        AMPM.classList.remove('visible');
        AMPM.classList.add('invisible');
    } else if (currentMode === 'C') {
        timeDisplay =  `${format12(h)}:${format(m)}:${format(s)}`;
        AMPM.classList.add('visible');
        AMPM.classList.remove('invisible');
    } else if (currentMode === 'D') {
        timeDisplay =  `${format12(h)}:${format(m)}`;
        AMPM.classList.add('visible');
        AMPM.classList.remove('invisible');
    } else {
        const timeDisplay =  `${format(h)}:${format(m)}`;
    }
    document.querySelector(".clock").innerText = timeDisplay;
}

function modeChangeHandle(e) {
    const btn = e.target;
    clock.classList.remove('visible');
    clock.classList.add('invisible');
    setTimeout([],500);
    clock.classList.remove('invisible');
    clock.classList.add('visible');
    const currentMode = clock.getAttribute('mode');
    if (currentMode === 'A') {
        clock.setAttribute('mode','B');
    } else if (currentMode === 'B') {
        clock.setAttribute('mode','C');
    } else if (currentMode === 'C') {
        clock.setAttribute('mode','D');
    } else if (currentMode === 'D') {
        clock.setAttribute('mode','A');
    } else {
        clock.setAttribute('mode','A');
    }
    updateClock();
    console.log('button clicked!')
}



function init() {
    updateClock();
    setInterval(updateClock,1000);
    modeChangeBtn.addEventListener("click",modeChangeHandle);
}


init();