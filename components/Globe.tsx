import React, { FC, useState, useEffect, DOMAttributes, MouseEventHandler } from "react";
import { KeyProps, MajorKeyProps, MinorKeyProps } from "./types";
import { Chord } from "./Chord";
import styles from "../styles/Globe.module.css";

interface GlobeProps {
  Major: MajorKeyProps;
  Minor: MinorKeyProps;
  selectedKey: MajorKeyProps | MinorKeyProps;
  currKeyProps: KeyProps;
  selectedScale: "melodic" | "harmonic" | "natural";
  selectedRoot: string;
}

interface CurrKeyCords {
  chords: string[];
  chordsHarmonicFunction: "T" | "SD" | "D";
  grades: string[];
}
interface CurrCord {
  chord: string;
  functionGroup: "T" | "SD" | "D";
  grade: string;
}

export const Globe: FC<GlobeProps> = ({
  selectedKey,
  selectedScale,
  selectedRoot,
}) => {
  //const [currKeyChords, setCurrKeyChords] = useState<CurrKeyCords | null>()

  const [currKeyChords, setCurrKeyChords] = useState<CurrCord[] | null>();
    const [selected, setSelected] = useState<boolean>(false)
  const [currChord, setCurrChord] = useState<CurrCord | null>();
  const [nextChords, setNextChords] = useState<CurrCord[] | null>();

    function handleClickedChord (e: boolean) {
        console.log("e:", e)
        setSelected(e === true)
    }
  //const harmonicFunctionGroups = (keyRoot, keyScale) => {
  //  keyRoot.keyScale.chords.reduce(
  //    (lookup, curr, idx) => {
  //      if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "T") {
  //        lookup.T.push(curr);
  //      }
  //      if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "SD") {
  //        lookup.SD.push(curr);
  //      }
  //      if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "D") {
  //        lookup.D.push(curr);
  //      }
  //      return lookup;
  //    },
  //    { T: [], SD: [], D: [] }
  //  );
  //};
  useEffect(() => {
    console.group("GLOBE");
    console.log("selectedKey:", selectedKey.tonic);
    console.log("selectedScale:", selectedScale);


    console.groupEnd();
  }, [selectedScale, selectedKey, setCurrKeyChords]);

        

  if (selectedKey.type === "minor") {
    return (
      <div className={styles.wrapDiv}>
        {selectedKey[selectedScale]?.chords.map((el, idx) => {
          return (
              <button onClick={(e)=>handleClickedChord(e.target)} className={styles.chordDiv} key={`${el}${idx}`}>
              <Chord
              key={idx.toString()}
                chord={el}
                grade={selectedKey[selectedScale]?.grades[idx]}
                chordsHarmonicFunction={
                  selectedKey[selectedScale]?.chordsHarmonicFunction[idx]
                }
                    selected={selected}
              />
            </button>
          );
        })}
      </div>
    );
  }
  if (selectedKey.type === "major") {
    return (
      <div className={styles.wrapDiv}>
        {selectedKey?.chords.map((el, idx) => {
          return (
            <button key={`${el}${idx}`} className={styles.chordDiv}>
              <Chord
              key={idx.toString()}
                chord={el}
                grade={selectedKey?.grades[idx]}
                chordsHarmonicFunction={
                  selectedKey?.chordsHarmonicFunction[idx]
                }
              selected={selected}
              />
            </button>
          );
        })}
      </div>
    );
  }
};
