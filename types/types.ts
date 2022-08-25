export interface CurrCord {
  chord: string;
  functionGroup?: string;
  grade?: string;
}
export interface ChordGroupObject {
  tonic: CurrCord[];
  subDom: CurrCord[];
  dom: CurrCord[];
}
export type Root = string;
export type KeyScale = string;

export type ScaleOptions = { [key: string]: "majorKey" | "minorKey" };

export interface Key {
    type: "major" | "minor";
    tonic: string;
    alteration: number;
    keySignature: string;
}
export interface KyScale {
    tonic: string;
    grades: readonly string[];
    intervals?: readonly string[];
    scale?: readonly string[];
    chords: readonly string[];
    chordsHarmonicFunction: readonly string[];
    chordScales?: readonly string[];
}
export interface MajKey extends  KyScale {
    type: "major";
    minorRelative?: string;
    scale: readonly string[];
    secondaryDominants?: readonly string[];
    secondaryDominantsMinorRelative?: readonly string[];
    substituteDominants?: readonly string[];
    substituteDominantsMinorRelative?: readonly string[];
}
type Natural = {[key: string]: KeyScale}
type Harmonic = {[key: string]: KeyScale}
type Melodic ={[key: string]: KeyScale}
export interface MiKey extends Key {
    type: "minor";
    relativeMajor: string;
    natural: keyof Natural;
    harmonic: keyof Harmonic;
    melodic: keyof Melodic;
}
