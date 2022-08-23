import { MinorKey } from "@tonaljs/key";

//export interface MajorKeyProps extends MinorKey {
//  alteration: number;
//  chordScales: string[];
//  chords: string[];
//  chordsHarmonicFunction: string[];
//  grades: string[];
//  intervals: string[];
//  keySignature: string;
//  minorRelative: string;
//  scale: string[];
//  secondaryDominants: string[];
//  secondaryDominantsMinorRelative: string[];
//  substituteDominants: string[];
//  substituteDominantsMinorRelative: string[];
//  tonic: string;
//  type: "major";
//};

//export type KeyProps = {
//  chordScales: string[];
//  chords: string[];
//  chordsHarmonicFunction: string[];
//  grades: string[];
//  intervals: string[];
//  scale: string[];
//  tonic: string;
//};

//export interface MinorKeyProps extends MinorKey{
//  alteration: number;
//  harmonic: KeyProps;
//  keySignature: string;
//  melodic: KeyProps;
//  natural: KeyProps;
//  relativeMajor: string;
//  tonic: string;
//  type: "minor";
//};
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
