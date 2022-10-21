const dawnStart = require('../assets/sound/dawn/dawn_start.mp3');
const dawnWitchStart = require('../assets/sound/dawn/witch_start.mp3');
const dawnWitchEnd = require('../assets/sound/dawn/witch_end.mp3');
const dawnEnd = require('../assets/sound/dawn/dawn_end.mp3');

const nightStart = require('../assets/sound/night/night_start.mp3');
const nightWitchStart = require('../assets/sound/night/witch_start.mp3');
const nightWitchEnd = require('../assets/sound/night/witch_end.mp3');
const constableStart = require('../assets/sound/night/constable_start.mp3');
const constableEnd = require('../assets/sound/night/constable_end.mp3');
const nightEnd = require('../assets/sound/night/night_end.mp3');

const blackCat = require('../assets/sound/actions/blackCat.mp3');
const gavelToken = require('../assets/sound/actions/saved.mp3');
const killed = require('../assets/sound/actions/killed.mp3');

export const dawn = {
    start: dawnStart,
    witchStart: dawnWitchStart,
    witchEnd: dawnWitchEnd,
    end: dawnEnd
};

export const night = {
    start: nightStart,
    witchStart: nightWitchStart,
    witchEnd: nightWitchEnd,
    constableStart,
    constableEnd,
    end: nightEnd
};

export const actions = {
    blackCat,
    gavel: gavelToken,
    killed
};

export default {
    dawn,
    night,
    actions
};
