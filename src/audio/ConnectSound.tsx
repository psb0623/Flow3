import * as React from 'react';
import {Text, View, StyleSheet, Button, TextPropTypes} from 'react-native';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio';

const melody = [
  require('../../assets/melody1.mp3'),
  require('../../assets/melody2.mp3'),
  require('../../assets/melody3.mp3'),
  require('../../assets/melody4.mp3'),
  require('../../assets/melody5.mp3'),
  require('../../assets/melody6.mp3'),
  require('../../assets/melody7.mp3'),
  require('../../assets/melody8.mp3'),
  require('../../assets/melody9.mp3'),
  require('../../assets/melody10.mp3'),
  require('../../assets/melody11.mp3'),
  require('../../assets/melody12.mp3'),
  require('../../assets/melody13.mp3'),
  require('../../assets/melody14.mp3'),
  require('../../assets/melody15.mp3'),
  require('../../assets/melody16.mp3'),
  require('../../assets/melody17.mp3'),
  require('../../assets/melody18.mp3'),
  require('../../assets/melody19.mp3'),
  require('../../assets/melody20.mp3'),
  require('../../assets/melody21.mp3'),
  require('../../assets/melody22.mp3'),
];

const octave = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17];

export async function connectSound(idx: number, mode: number) {
  await Audio.setAudioModeAsync({playsInSilentModeIOS: true});
  let bgm = new Audio.Sound();

  try {
    await bgm.loadAsync(melody[mode === 3 ? octave[idx] : idx]);
    await bgm.playAsync();
    setTimeout(async () => {
      await bgm.stopAsync();
      await bgm.unloadAsync();
    }, 2000);
  } catch (error) {}
}
