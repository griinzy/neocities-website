let skewElem = document.getElementById('website-skew');
let rotElem = document.getElementById('website-rotate');
let resetBtn = document.getElementById('silly-reset-btn');

skewElem.value = 0;
rotElem.value = 0;

const EVERYTHING = document.querySelectorAll('*');

function fuckItUp() {
    const skew = skewElem.value;
    const rot = rotElem.value;
    const transform = `skewX(${skew}deg) rotateZ(${rot}deg)`;
    
    EVERYTHING.forEach(elem => {
        elem.style.transform = transform;
    });
}

skewElem.addEventListener('change', fuckItUp);
rotElem.addEventListener('change', fuckItUp);