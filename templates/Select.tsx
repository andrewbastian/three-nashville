import React, { FC, useState, ChangeEvent } from "react";
import { Key } from "@tonaljs/tonal";
import { useKey } from "../context/main-context";
import styles from "../styles/Select.module.css";
//import * as Tone from "tone";

export const Select: FC = () => {
  /*_____STATE_&_CONTEXT____*/
  ///////////////////////////////////////////
  const {
    selectedScale,
    selectedRoot,
    selectedKey,
    setSelectedScale,
    setSelectedRoot,
    setSelectedKey,
    selectedKeyRef,
    //playScale,
    //transport,
  } = useKey();
  ///////////////////////////////////////////
  const rootOptions: string[] = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  ///////////////////////////////////////////
  const scaleValues: { [key: string]: string } = {
    major: "major",
    harmonic: "harmonic",
    melodic: "melodic",
    natural: "natural",
  };
  ///////////////////////////////////////////
  const [isMajor, setIsMajor] = useState(true);

  /*__________HANDLERS___________*/
  ///////////////////////////////////////////
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedScale === "melodic" || "natural" || "harmonic") {
      const minorKeyMap = new Map();
      Object.entries(Key.minorKey(selectedRoot)).map((v) => {
        minorKeyMap.set(v[0], v[1]);
      });
      const res = minorKeyMap.get(`${selectedScale}`);

      setSelectedKey(res);
      selectedKeyRef.current = selectedKey;
      //TODO: Think this needs a clean up handler after sequence has fired
      //Tone.start()
      //playScale(selectedScale, selectedRoot);
    }
    if (isMajor === true) {
      selectedKeyRef.current = Key.majorKey(selectedRoot);
      setSelectedKey(Key.majorKey(selectedRoot));
      //Tone.start()
      //playScale('major', selectedRoot);
    }
  };
  ///////////////////////////////////////////
  const handleRootChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedRoot(event.target.value);
  };
  ///////////////////////////////////////////
  const handleScaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (event.target.value === "natural" || "melodic" || "harmonic") {
      setSelectedScale(event.target.value);
      setIsMajor(false);
    }
    if (event.target.value === "major") {
      setIsMajor(true);
    }
  };

  /*____JSX_____*/

  return (
    <>
      <div className={styles.selectMainDiv}>
        <h3 className={styles.selectTitle}>Select a Key</h3>
        <form onSubmit={handleSubmit}>
          <select
            className={styles.select}
            key="root"
            name="root"
            id="root"
            onChange={handleRootChange}
          >
            {rootOptions.map((r) => {
              return (
                <option key={r.toString()} defaultValue="A" value={r}>
                  {r}
                </option>
              );
            })}
          </select>
          <select
            className={styles.select}
            key="scale"
            name="scale"
            id="scale"
            onChange={handleScaleChange}
          >
            {Object.keys(scaleValues).map((s) => {
              return (
                <option key={s} value={scaleValues[s]}>
                  {s}
                </option>
              );
            })}
          </select>
          <button className={styles.selectButton} type="submit">
            Show Me The Chords
          </button>
        </form>
      </div>
    </>
  );
};
