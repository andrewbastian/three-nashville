import React, { FC, useState, ChangeEvent } from "react";
import { Key } from "@tonaljs/tonal";
import { useKey } from "../context/main-context";
import * as Tone from "tone";

export const Select: FC = () => {
  {
    /*_____STATE_&_CONTEXT____*/
  }

  ///////////////////////////////////////////
  const {
    selectedScale,
    selectedRoot,
    setSelectedScale,
    setSelectedRoot,
    setSelectedKey,
    selectedKeyRef,
    playScale,
    transport,
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
  const scaleValues = {
    major: "major",
    harmonic: "harmonic",
    melodic: "melodic",
    natural: "natural",
  };
  ///////////////////////////////////////////
  const [isMajor, setIsMajor] = useState(true);

  {
    /*__________HANDLERS___________*/
  }

  ///////////////////////////////////////////
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedScale === "melodic" || "natural" || "harmonic") {
      let keyInfo = Key.minorKey(selectedRoot);
      selectedKeyRef.current = keyInfo[selectedScale];
      setSelectedKey(keyInfo[selectedScale]);
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

  {
    /*____JSX_____*/
  }

  return (
    <>
      <div>
        <h3>Select a Key</h3>
        <form onSubmit={handleSubmit}>
          <select key="root" name="root" id="root" onChange={handleRootChange}>
            {rootOptions.map((r) => {
              return (
                <option key={r.toString()} defaultValue="A" value={r}>
                  {r}
                </option>
              );
            })}
          </select>
          <select
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
          <button type="submit">Show Me The Chords</button>
        </form>
      </div>
    </>
  );
};
