import style from "@/styles/main-menu/SplashScreen.module.css";
import { ISourceOptions } from "@tsparticles/engine";
import { loadFirePreset } from "@tsparticles/preset-fire";
// @ts-ignore:next-line
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect } from "react";

interface Props {
  skip?: boolean;
}

const SplashScreen: React.FC<Props> = ({ skip }) => {

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFirePreset(engine);
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
    fpsLimit: 120,
  };

  return (
    <>
      {skip ? null :
        <>
          <div className={`${style.overlay}`}></div>
          <h1 className={`${style.title}`} id="title">
            Ember
          </h1>
        </>
      }
      <Particles options={options} />
    </>
  );
};

export default SplashScreen;
