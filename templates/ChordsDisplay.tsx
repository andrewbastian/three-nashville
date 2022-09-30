import React, { FC, useRef } from "react";
import { ChordCard } from "../organisms/ChordCard";
import { Chord } from "@tonaljs/tonal";
import styles from "../styles/ChordDisplay.module.css";
import { useKey } from "../context/main-context";

export const ChordsDisplay: FC = () => {
  {
    /*______________CONTEXT_&_REFS________________*/
  }
  ///////////////////CONTEXT////////////////////////
  const { selectedChord, musicalKey } = useKey();

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
        <h2>Tonic</h2>
        <div className={styles.chordsContainer}>
          {musicalKey?.tonic.map((el, idx) => {
            return (
              <div key={`${el}${idx}`} className={styles.chordDiv}>
                <ChordCard
                  chord={el.chord}
                  notes={Chord.get(el.chord).notes}
                  grade={el.grade!}
                  chordsHarmonicFunction={el.functionGroup!}
                  selectedChord={selectedChord}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.famDiv} ref={subDomRef} id={styles.subDom}>
        <h2>SubDominant</h2>
        <div className={styles.chordsContainer}>
          {musicalKey?.subDom.map((el, idx) => {
            return (
              <div key={`${el}${idx}`} className={styles.chordDiv}>
                <ChordCard
                  chord={el.chord}
                  notes={Chord.get(el.chord).notes}
                  grade={el.grade!}
                  chordsHarmonicFunction={el.functionGroup!}
                  selectedChord={selectedChord}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.famDiv} ref={domRef} id={styles.dom}>
        <h2>Dominant</h2>
        <div className={styles.chordsContainer}>
          {musicalKey?.dom.map((el, idx) => {
            return (
              <div key={`${el}${idx}`} className={styles.chordDiv}>
                <ChordCard
                  chord={el.chord}
                  notes={Chord.get(el.chord).notes}
                  grade={el.grade!}
                  chordsHarmonicFunction={el.functionGroup!}
                  selectedChord={selectedChord}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
