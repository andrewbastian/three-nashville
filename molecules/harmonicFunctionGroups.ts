import { ChordGroupObject } from "../types/types";
import { MajorKey, KeyScale } from "@tonaljs/Key";

export const harmonicFunctionGroups = (sK: MajorKey | KeyScale) => {
  let res = sK.chords.reduce<ChordGroupObject>(
    (lookup: ChordGroupObject, value: string, idx) => {
      sK.chordsHarmonicFunction[idx] === "T"
        ? lookup.tonic.push({
            chord: value,
            functionGroup: sK.chordsHarmonicFunction[idx],
            grade: sK.grades[idx],
          })
        : sK.chordsHarmonicFunction[idx] === "SD"
        ? lookup.subDom.push({
            chord: value,
            functionGroup: sK.chordsHarmonicFunction[idx],
            grade: sK.grades[idx],
          })
        : sK.chordsHarmonicFunction[idx] === "D"
        ? lookup.dom.push({
            chord: value,
            functionGroup: sK.chordsHarmonicFunction[idx],
            grade: sK.grades[idx],
          })
        : null;

      return lookup;
    },
    { tonic: [], subDom: [], dom: [] }
  );
  return res;
};
