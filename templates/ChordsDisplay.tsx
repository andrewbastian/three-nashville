import React, { FC, useEffect, useRef } from "react";
import { ChordCard } from "../organisms/ChordCard";
import { Chord } from "@tonaljs/tonal";
import styles from "../styles/ChordDisplay.module.css";
import { useKey } from "../context/main-context";

export const ChordsDisplay: FC = () => {
  {
    /*______________CONTEXT_&_REFS________________*/
  }
  ///////////////////CONTEXT////////////////////////
  const { selectedChord, setSelectedChord, musicalKey } = useKey();

  ///////////////////REFS////////////////////////
  const tonicRef = useRef<HTMLDivElement>(null!);
  const subDomRef = useRef<HTMLDivElement>(null!);
  const domRef = useRef<HTMLDivElement>(null!);

  {
    /*_____________JSX_____________*/
  }
  return !musicalKey ? null : (
    <div className={styles.wrapDiv}>
      {/*{selectedKey? <PlayScale tonicProps={selectedRoot} scaleProps={selectedScale}/>  : null}*/}
      <div className={styles.famDiv} ref={tonicRef} id={styles.tonic}>
        <h1>Tonic</h1>
        {musicalKey?.tonic.map((el, idx) => {
          return (
            <div key={`${el}${idx}`} className={styles.chordDiv}>
              <ChordCard
                chord={el.chord}
                notes={Chord.get(el.chord).notes}
                grade={el.grade!}
                chordsHarmonicFunction={el.functionGroup!}
                setSelectedChord={setSelectedChord}
                selectedChord={selectedChord}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.famDiv} ref={subDomRef} id={styles.subDom}>
        <h1>SubDom</h1>
        {musicalKey?.subDom.map((el, idx) => {
          return (
            <div key={`${el}${idx}`} className={styles.chordDiv}>
              <ChordCard
                chord={el.chord}
                notes={Chord.get(el.chord).notes}
                grade={el.grade!}
                chordsHarmonicFunction={el.functionGroup!}
                setSelectedChord={setSelectedChord}
                selectedChord={selectedChord}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.famDiv} ref={domRef} id={styles.dom}>
        <h1>Dom</h1>
        {musicalKey?.dom.map((el, idx) => {
          return (
            <div key={`${el}${idx}`} className={styles.chordDiv}>
              <ChordCard
                chord={el.chord}
                notes={Chord.get(el.chord).notes}
                grade={el.grade!}
                chordsHarmonicFunction={el.functionGroup!}
                setSelectedChord={setSelectedChord}
                selectedChord={selectedChord}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
