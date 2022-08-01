export type MajorKeyProps = {
     alteration: number
    chordScales: string[]
    chords: string[]
    chordsHarmonicFunction: string[]
    grades: string[]
    intervals: string[]
    keySignature: string
    minorRelative: string
    scale: string[]
    secondaryDominants: string[]
    secondaryDominantsMinorRelative: string[]
    substituteDominants: string[]
    substituteDominantsMinorRelative: string[]
    tonic: string
    type: "major"
}

export type KeyProps = {
chordScales: string[]
chords: string[]
chordsHarmonicFunction: string[]
grades: string[]
intervals: string[]
scale: string[]
tonic: string
}

export type MinorKeyProps = {
alteration: number
harmonic: KeyProps
keySignature: string
melodic: KeyProps
natural: KeyProps
relativeMajor: string
tonic: string
type: "minor"
}
