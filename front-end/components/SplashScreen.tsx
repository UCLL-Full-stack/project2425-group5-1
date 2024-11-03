import style from "@/styles/SplashScreen.module.css";
import { ISourceOptions } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFirePreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    preset: "fire",
    fullScreen: {
      enable: true,
      zIndex: -999,
    },
    background: {
      position: "50% 50%",
      size: "cover",
      repeat: "no-repeat",
    },
  };
  return (
    <>
      <div className={`${style.overlay}`}></div>
      <h1 className={`${style.title}`} id="title">
        Ember
      </h1>
      <Particles options={options} />
    </>
  );
};

export default SplashScreen;
