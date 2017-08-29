'use strict';
import isDevelopMode from './isDevelopMode';

const LEVEL_LOG = 1;
const LEVEL_WARN = 2;
const LEVEL_ERR = 3;

function log(...args) {
    print(LEVEL_LOG, ...args);
}

function warn(...args) {
    print(LEVEL_WARN, ...args);
}

function err(...args) {
    print(LEVEL_ERR, ...args);
}

function print(level, ...args) {
    if (isDevelopMode()) {
        switch (level) {
            case LEVEL_LOG:
                console.log(...args);
                break;
            case LEVEL_WARN:
                console.warn(...args);
                break;
            case LEVEL_ERR:
                console.err(...args);
                break;
            default:
              //do nothing
        }
    } else {
        //do nothing
    }
}

module.exports = {log, warn, err};