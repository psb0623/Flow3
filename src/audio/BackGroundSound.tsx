import * as React from 'react';
import {Text, View, StyleSheet, Button, TextPropTypes} from 'react-native';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio';

const bgm = new Audio.Sound();

export async function backgroundMusic() {
  await Audio.setAudioModeAsync({playsInSilentModeIOS: true});

  try {
    await bgm.loadAsync(require('../../assets/MainBGM.wav'));
    await bgm.playAsync();
  } catch (error) {}
  bgm.setIsLoopingAsync(true);
}
