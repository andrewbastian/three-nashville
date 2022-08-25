import { useState, useRef, useMemo, createContext, useContext } from "react";

import {
  ChordGroupObject,
  Root,
  CurrCord,
  MajKey,
  KyScale,
} from "../types/types";

import * as Tone from "tone";
import { Chord, Scale } from "@tonaljs/tonal";

import * as THREE from "three";

/*~~~~~~~~~~~~~~~~USE_KEY_CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const useKeyController = (
  musicalKey?: ChordGroupObject | null,
  nextChord?: string[] | null
) => {
  /*~~~~~~~~~~~~~~~~STATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /////////////////THREE_STUFF//////////////////////////
  THREE.Cache.enabled = true;
  const theoryColors: { [key: string]: string } = {
    T: "#FF7F11",
    SD: "#26F0F1",
    D: "#EF476F",
  };
  const colorRef = useRef<string | null>();

  /////////////////TONEAL/THEORY_STUFF//////////////////////////
  const [selectedRoot, setSelectedRoot] = useState<Root>("A");
  const [selectedScale, setSelectedScale] = useState<string>("major");
  const [selectedKey, setSelectedKey] = useState<MajKey | KyScale | null>(null);
  const [currKeyChords, setCurrKeyChords] = useState<ChordGroupObject | null>();
  const [selectedChord, setSelectedChord] = useState<CurrCord | null>(null);
  const [nextCs, setNextCs] = useState<string[] | null>();

  const selectedChordRef = useRef<CurrCord | null>(null);
  const selectedKeyRef = useRef<MajKey | KyScale | null>(null);

  /////////////////TONEJS_STUFF//////////////////////////
  const [scheduleTime, setScheduleTime] = useState<number | null>(null);
  const transport = Tone.Transport;
  const chordEventRef = useRef<Tone.ToneEvent>();
  const seqRef = useRef<Tone.Sequence>();
  const drawRef = useRef<typeof Tone.Draw>();
  const scheduleRef = useRef<null | number>();
  const tremRef = useRef<Tone.Tremolo>();
  const reverbRef = useRef<Tone.Reverb>();

  /*~~~~~~~~~~~~~~~~~~USE_MEMO~~~~~~~~~~~~~~~~~~*/
  ///////////////FILTER_DATA_INTO_GROUPS_4_DISPLAY/////////////////////
  const filterCurrChords = useMemo(() => {
    if (selectedKeyRef.current) {
      let res = selectedKeyRef.current.chords.reduce<ChordGroupObject>(
        (lookup: ChordGroupObject, value: string, idx) => {
          selectedKeyRef.current?.chordsHarmonicFunction[idx] === "T"
            ? lookup.tonic.push({
                chord: value,
                functionGroup:
                  selectedKeyRef.current?.chordsHarmonicFunction[idx],
                grade: selectedKeyRef.current?.grades[idx],
              })
            : selectedKeyRef.current?.chordsHarmonicFunction[idx] === "SD"
            ? lookup.subDom.push({
                chord: value,
                functionGroup:
                  selectedKeyRef.current?.chordsHarmonicFunction[idx],
                grade: selectedKeyRef.current?.grades[idx],
              })
            : selectedKeyRef.current?.chordsHarmonicFunction[idx] === "D"
            ? lookup.dom.push({
                chord: value,
                functionGroup:
                  selectedKeyRef.current?.chordsHarmonicFunction[idx],
                grade: selectedKeyRef.current?.grades[idx],
              })
            : selectedKeyRef.current?.chordsHarmonicFunction[idx] === ""
            ? lookup.tonic.push({
                chord: value,
                functionGroup:
                  selectedKeyRef.current.chordsHarmonicFunction[idx],
                grade: selectedKeyRef.current.grades[idx],
              })
            : null;

          return lookup;
        },
        { tonic: [], subDom: [], dom: [] }
      );
      return res;
    }
  }, [selectedKeyRef.current, selectedKey, currKeyChords]);

  ///////////////FILTER_NEXT_CHORD_OPTIONS/////////////////////
  const filterNextChords = useMemo(() => {
    console.group("FilterNext");

    console.log("selectedChordRef.current:", selectedChordRef.current);
    console.groupEnd();
    if (selectedChordRef?.current?.grade === "I") {
      console.log("I______________TRUE");
      const res = ["II", "III", "VI", "V", "VI", "VII"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "II") {
      console.log("II______________TRUE");
      const res = ["I", "V", "VI", "VII"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "III") {
      console.log("III______________TRUE");
      const res = ["I", "II", "VI", "III"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "IV") {
      console.log("IV______________TRUE");
      const res = ["I", "II", "V", "VI", "VII"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "V") {
      console.log("V______________TRUE");
      const res = ["I", "VII"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "VI") {
      console.log("VI______________TRUE");
      const res = ["II", "IV"];
      setNextCs(res);
    }
    if (selectedChordRef?.current?.grade === "VII") {
      console.log("VII______________TRUE");
      const res = ["I", "V"];
      setNextCs(res);
    }
    console.log("nextCs:", nextCs);
    return nextCs;
  }, [selectedChordRef.current, selectedChord]);

  /*~~~~~~~~~~~~~~~~~~TONEJS~~~~~~~~~~~~~~~~~~*/
  ///////////////PLAY_SYNTH_OF_SELECTED_CHORD/////////////////////
  const playPolySynth = (chord: string) => {
    const getChordNotes = (c: string) => {
      const chordObj = Chord.get(c);
      const alias = chordObj.aliases[0];
      const tonicAtFrq = chordObj.tonic + "3";
      return Chord.getChord(alias, tonicAtFrq).notes;
    };

    tremRef.current = new Tone.Tremolo().toDestination();
    reverbRef.current = new Tone.Reverb().connect(tremRef.current);
    const polySynth = new Tone.PolySynth(Tone.AMSynth).connect(
      reverbRef.current
    );
    const chordNotesAtfreqs = getChordNotes(chord);

    chordEventRef.current = new Tone.ToneEvent((time, chord) => {
      Tone.Draw.schedule(() => {
        console.log("time:", time);
        scheduleRef.current = time;
        setScheduleTime(time);
      }, time);
      polySynth.triggerAttackRelease(chord, "3n", time);
    }, chordNotesAtfreqs);
    chordEventRef.current.start();
    chordEventRef.current.debug = true;
    chordEventRef.current.loop = 1;
    chordEventRef.current.loopEnd = 2;
    chordEventRef.current.humanize = true;
    transport.start();
    if (chordEventRef.current.state === "stopped") {
      chordEventRef.current.dispose();
      //transport.dispose();
    }
  };

  ///////////////PLAY_SYNTH_OF_SELECTED_SCALE/////////////////////
  const playScale = (scale: string, tonic: string) => {
    let s = [];
    if (scale === "major") {
      s = Scale.get(`${tonic}4 ${scale}`).notes;
      s = [...s, `${tonic}5`];
    } else {
      s = Scale.get(`${tonic}4 ${scale} minor`).notes;
    }

    const synth = new Tone.Synth().toDestination();

    seqRef.current = new Tone.Sequence((time, note) => {
      {
        /*Tone.Draw.schedule(() => {
        console.log("time:", time);
        scheduleRef.current = time;
        setScheduleTime(time);
      }, time);*/
      }
      synth.triggerAttackRelease(note, "2n", time);
    }, s).start(0);
    //seqRef.current.debug = true;
    seqRef.current.loop = false;
    transport.start();
    if (seqRef.current.state === "stopped") {
      //seqRef.current.dispose();
      //transport.dispose();
    }
  };

  /*~~~~~~~~~~~~~~~~~~~~CONTROLER_RETURNS~~~~~~~~~~~~~~~~~~~~~~~~~*/
  return {
    theoryColors,
    colorRef,
    selectedChordRef,
    setNextCs,
    nextCs,
    chordEventRef,
    drawRef,
    scheduleRef,
    scheduleTime,
    transport,
    playPolySynth,
    playScale,
    selectedRoot,
    setSelectedRoot,
    selectedScale,
    setSelectedScale,
    selectedKey,
    setSelectedKey,
    selectedKeyRef,
    currKeyChords,
    setCurrKeyChords,
    selectedChord,
    setSelectedChord,
    musicalKey: filterCurrChords,
    nextChord: filterNextChords,
  };
};

/*~~~~~~~~~~~~~~~~~~~KEY_CONTEXT~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const KeyContext = createContext<ReturnType<typeof useKeyController>>({
  theoryColors: { T: "#FF7F11", SD: "#26F0F1", D: "#EF476F" },
  colorRef: { current: null },
  selectedChordRef: { current: null },
  setNextCs: () => {},
  nextCs: [],
  transport: Tone.Transport,
  playPolySynth: () => {},
  playScale: () => {},
  chordEventRef: { current: undefined },
  drawRef: { current: undefined },
  scheduleRef: { current: null },
  scheduleTime: null,
  selectedRoot: "A",
  setSelectedRoot: () => {},
  selectedScale: "major",
  setSelectedScale: () => {},
  selectedKey: null,
  setSelectedKey: () => {},
  selectedKeyRef: { current: null },
  currKeyChords: null,
  setCurrKeyChords: () => {},
  selectedChord: null,
  setSelectedChord: () => {},
  musicalKey: { tonic: [], subDom: [], dom: [] },
  nextChord: [],
});

/*~~~~~~~~~~~~~~~~~~~KEY_PROVIDER~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const KeyProvider: React.FunctionComponent<{
  musicalKey: ChordGroupObject;
  nextChord: string[];
  children: JSX.Element;
}> = ({ musicalKey, nextChord, children }) => (
  <KeyContext.Provider value={useKeyController(musicalKey, nextChord)}>
    {children}
  </KeyContext.Provider>
);

/*~~~~~~~~~~~~~~~~~~~EXPORT~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const useKey = () => useContext(KeyContext);
