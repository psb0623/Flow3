import * as React from 'react';
import {AppStack} from './src/page/stack/AppStack';
import {useEffect, useState} from 'react';
import {Splash} from './src/page/Splash/Splash';
import {View} from 'react-native';
import {backgroundMusic} from './src/audio/BackGroundSound';

export default function App() {
  backgroundMusic();

  const [load, setLoad] = useState<Boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  }, [setLoad]);

  return !load ? <Splash /> : <AppStack />;
}
