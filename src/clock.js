const clock = document.querySelector(".clock");

function updateClock () {
    const format = (v) => {
        const s = "00" + v;
        return s.substr(s.length-2, 2);
    }
    const d = new Date();
    const [h,m,s] = [d.getHours(),d.getMinutes(),d.getSeconds()];
    document.querySelector(".clock").innerText = `${format(h)}:${format(m)}:${format(s)}`;
}
updateClock();
setInterval(updateClock,1000);
