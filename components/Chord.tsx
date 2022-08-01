import React, { FC, useEffect, useState } from "react"

interface ChordProps {
    chord: string;
    chordsHarmonicFunction: string;
    grade: string;
    selected: boolean
}

export const Chord: FC<ChordProps> = ({chord, chordsHarmonicFunction, grade, selected }) => {
   useEffect(() => {
       if (selected === true) {
           console.log(`${chord}:`, selected)
       }

   }, [selected]) 
    return (
        <>
        <p key={chord}>{chord}</p>
        <p key={chordsHarmonicFunction}>{chordsHarmonicFunction}</p>
        <p key={grade}>{grade}</p>
</>
    )
}
