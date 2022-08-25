import { MinorKey, KeyScale, MajorKey } from "@tonaljs/key";

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

type CreateMutable<T> = {
    -readonly [P in keyof T]: T[P]
}

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
export interface MajKey extends  KeyScale {
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
//export type MajKey = CreateMutable<MajorKey>

//export type MiKey = CreateMutable<MinorKey>

//export type KyScale = CreateMutable<MinorKey['natural']>

