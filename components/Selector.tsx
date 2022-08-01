import React, { FC, useState, useEffect, ChangeEvent, FormClick } from "react";
import { InferGetStaticPropsType } from 'next'
import { Globe } from './Globe';
import { Key, Progression } from "@tonaljs/tonal";
import { MajorKeyProps, MinorKeyProps } from "types";
import { useKey } from "../context/main-context";
import { MainLayout } from '../layouts/main';

type Root = string;

type Scale = string;

type SelectedRoot = Root | null;
type SelectedScale = Scale | null;

interface SelectedKey {
  [key: Root | null]: "minorKey" | "majorKey" | null;
  [key: "scale"]: string | null;
}

type ScaleOptions = { [key: string]: "majorKey" | "minorKey" };

export const Selector: FC = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { musicalKey } = props;
  const { setMusicalKey } = useKey();

  const rootOptions: string[] = [
    "Ab",
    "A",
    "B",
    "Bb",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
  ];

  const scaleOptions: ScaleOptions[] = [
    { major: "majorKey" },
    { harmonic: "minorKey" },
    { melodic: "minorKey" },
    { natural: "minorKey" },
  ];

  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<ScaleOptions | null>(null);
  const [selectedKey, setSelectedKey] = useState<
    MajorKeyProps | MinorKeyProps | null
  >({});

  //console.log(
  //  "scaleOptions.map(r=>r):",
  //  scaleOptions.map((r) => Object.keys(r))
  //);

  const harmonicFunctionGroups = (keyRoot, keyScale) => {
    keyRoot.keyScale.chords.reduce(
      (lookup, curr, idx) => {
        if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "T") {
          lookup.T.push(curr);
        }
        if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "SD") {
          lookup.SD.push(curr);
        }
        if (keyRoot.keyScale.chordsHarmonicFunction[idx] === "D") {
          lookup.D.push(curr);
        }
        return lookup;
      },
      { T: [], SD: [], D: [] }
    );
  };
  useEffect(() => {
    if (selectedScale && selectedRoot) {
      //selectedScale.split(',')
      let val = selectedScale.split(",")[1];
      //console.log("val:", val);
      //console.log("selectedScale.split(',')[1]:", `${selectedRoot}${selectedScale.split(',')[1]}.${selectedScale.split(',')[0]}`)
      setSelectedKey(`${selectedRoot}${selectedScale.split(','[1])}.${selectedScale.split(',')[0]}`)
      if (val === "minorKey") {
        setSelectedKey(Key.minorKey(selectedRoot));
      }
      if (val === "majorKey") {
        setSelectedKey(Key.majorKey(selectedRoot));
      }
        setMusicalKey(musicalKey)
    }
    console.group("USEEFFECT_SELECT");
    console.log("selectedRoot:", selectedRoot);
    console.log("selectedScale:", selectedScale);
      console.log("selectedKey:", selectedKey)
      console.log("props:", props)
    console.groupEnd();
  }, [musicalKey, selectedRoot, selectedScale, musicalKey]);
  const handleRootChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRoot(event.target.value);
  };

  const handleScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedScale(event.target.value);
  };
  const handleClick = (event: FormClick) => {
    event.preventDefault();
    //setSelectedKey(selectedRoot, selectedScale)
    console.log("THE WAY:", selectedKey);
  };
  return (
    <>
      <div>
        <h3>SELECTOR</h3>
        <form>
          <select name="root" id="root" onChange={handleRootChange}>
            {rootOptions.map((r) => {
              return (
                <option key={r} value={r}>
                  {r}
                </option>
              );
            })}
          </select>
          <select onChange={handleScaleChange}>
            {scaleOptions.map((s) => {
              return (
                <option key={Object.keys(s)} value={Object.entries(s)}>
                  {Object.keys(s).toString()}
                </option>
              );
            })}
          </select>
        </form>
{selectedKey && selectedScale? 
      <Globe selectedRoot={selectedRoot} selectedKey={selectedKey} selectedScale={selectedScale.split(',')[0].toString()}/>
    :
    null}
      </div>
    </>
  );
};
//Selector.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getStaticProps = (selectedRoot, selectedScale) => {
  let val = selectedScale.split(",")[1];
  if (val === "minorKey") {
    const musicalKey = Key.minorKey(selectedRoot);
  }
  if (val === "majorKey") {
    const musicalKey = Key.majorKey(selectedRoot);
  }
  return {
    props: {
      musicalKey,
    },
  };
};
