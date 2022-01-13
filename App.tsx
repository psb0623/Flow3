import * as React from "react";
import { AppStack } from "./src/page/stack/AppStack";
import {useEffect, useState} from "react";
import {Splash} from "./src/page/Splash";

export default function App() {

  const [load, setLoad] = useState<Boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setLoad(true)
    }, 1000)
  }, [setLoad])

  return (
    !load ? <Splash/>: <AppStack/>
  );
};
