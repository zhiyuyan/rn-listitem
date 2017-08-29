'use strict'

import { ToastAndroid, Platform } from 'react-native';
import NdModules from '@sdp.nd/nd-react-wrapper';

const SHORT = 0;
const LONG = 1;

function show(message, duration) {
    NdModules.NdInstances.sdp_sys.toast({message: message});
    // if(Platform.OS == 'android') {
    //     ToastAndroid.show(message, getAndroidDuration(duration));
    // } else if(Platform.OS == 'ios') {
    //     Toast.show(message, getIosDuration(duration));
    // }
}

function getAndroidDuration(duration) {
    switch (duration) {
        case SHORT:
            return ToastAndroid.SHORT;
        case LONG:
            return ToastAndroid.LONG;
    }
}

function getIosDuration(duration) {
    switch (duration) {
        case SHORT:
            return 3.5;
        case LONG:
            return 2;
    }
}

module.exports = {SHORT, LONG, show};