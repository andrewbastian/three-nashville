import React, { FC, useEffect, useMemo, useState, useRef } from "react";
import { Chord } from "@tonaljs/tonal";
import styles from "../styles/ChordDisplay.module.css";
import { useKey } from "../context/main-context";
import * as Tone from "tone";
import * as THREE from "three";
import { dankFont } from "../atoms/getDankFont";
import { Canvas } from "@react-three/fiber";

import { Text3D, Center, Float } from "@react-three/drei";
import { CurrCord } from "../types/types";

{
  /*~~~~~~~~~~~~TYPES~~~~~~~~~~~~~~~~~*/
}
interface ChordProps {
  chord: string;
  chordsHarmonicFunction: string;
  grade: string;
  notes: string[];
  selectedChord: CurrCord | null;
  chordButtonRef: React.ForwardedRef<HTMLButtonElement>;
}

{
  /*~~~~~~~~~~~~COMPONENT~~~~~~~~~~~~~~~~~*/
}
export const ChordCard: FC<ChordProps> = ({
  chord,
  grade,
  notes,
  chordsHarmonicFunction,
}) => {
  {
    /*~~~~~~~~~~~~STATE_CONTEXT_&_REFS~~~~~~~~~~~~~~~~~*/
  }
  //////////////CONTEXT//////////////////////
  const {
    theoryColors,
    colorRef,
    playPolySynth,
    setSelectedChord,
    selectedChordRef,
  } = useKey();
  //////////////STATE//////////////////////
  const [chordName, setChordName] = useState(chord);
  const [chordNotes, setChordNotes] = useState(notes);
  //////////////REFS//////////////////////
  const buttonRef = useRef(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const meshRef = useRef(null!);
  const color = theoryColors[chordsHarmonicFunction];

  {
    /*~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~*/
  }

  //////////////REMOVE_||_ADD_LAST_NOTE_OF_CHORD_ARRAY//////////////////////
  const toggleSevens = () => {
    if (chordName === chord) {
      const simpleChord = chordNotes.slice(0, 3);
      setChordName(() => Chord.detect(simpleChord)[0]);
      setChordNotes(() => simpleChord);
    }
    if (chordName != chord) {
      setChordName(() => chord);
      setChordNotes(notes);
    }
  };

  ///////////////SET_SELECTED_CHORD_REF_&&_PLAY_CHORD/////////////////////////
  const handleSelectedChord = () => {
    selectedChordRef.current = {
      chord: chord,
      functionGroup: chordsHarmonicFunction,
      grade: grade,
    };
    setSelectedChord({
      chord: chord,
      functionGroup: chordsHarmonicFunction,
      grade: grade,
    });
    colorRef.current = theoryColors[chordsHarmonicFunction];
    //TODO: set array for next chords
    //filterNextChords
    Tone.start();
    playPolySynth(chordName);
  };

  {
    /*~~~~~~~~~~~~USE_EFFECT~~~~~~~~~~~~~~~~~*/
  }
  useEffect(() => {
    setChordName(chord);
  }, [chord]);

  {
    /*~~~~~~~~~~~~JSX~~~~~~~~~~~~~~~~~*/
  }
  return (
    <div className={styles.cardDiv}>
      <button
        ref={buttonRef}
        onClick={handleSelectedChord}
        value={grade}
        className={styles.playChordButton}
      >
        <div className={styles.buttonDiv}>
          <Canvas
            className={styles.headerCanvas}
            camera={{ position: [-1, 0, 10] }}
          >
            <Center>
              <mesh ref={textRef} onClick={handleSelectedChord}>
                <Float
                  floatIntensity={3}
                  rotationIntensity={2.9}
                  floatingRange={[0, 0.5]}
                  speed={3}
                >
                  <ambientLight intensity={0.4} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.25}
                    penumbra={2}
                  />
                  <pointLight position={[-10, -10, -10]} />
                  <Text3D
                    ref={meshRef}
                    font={dankFont}
                    curveSegments={10}
                    size={2.2}
                    bevelSegments={10}
                    bevelThickness={100}
                    bevelSize={19}
                  >
                    {grade}
                    {chordNotes[3] ? "7" : ""}
                    <meshPhysicalMaterial
                      color={color}
                      side={THREE.DoubleSide}
                    />
                  </Text3D>
                </Float>
              </mesh>
            </Center>
          </Canvas>
        </div>
      </button>
      <button className={styles.toggleSevens} onClick={toggleSevens}>
        {!chordNotes[3] ? "7th on" : "7th off"}
      </button>
    </div>
  );
};
