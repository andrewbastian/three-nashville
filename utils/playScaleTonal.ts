import { useEffect, useRef } from "react";
import * as Tone from "tone";

import { Range, Scale } from "@tonaljs/tonal";

//const seqReffined = useRef()

export const playScale = (scale?: string, dispose = false) => {
  //const scaleRef = useRef<string | null>();
  console.log("_PlayedScale__");
  let getScale = (c: string) => {
    return Scale.get(c);
  };
  if (scale) {
      let scaleNotesAtfreqs = getScale(scale).notes;
      Tone.Offline(()=>{
      const synth = new Tone.Synth().toDestination();
      const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.2, time);
      }, scaleNotesAtfreqs);
    //if (scaleRef.current != scale) {
    //  scaleRef.current = scale;

      seq.humanize = true;
      seq.start();
        
      seq.loop = 1;
      seq.loopEnd = 16;
    
      //seq.loop = false
      //Tone.Transport.start();
      //Tone.Transport.stop(3);
      synth.debug = true;
        //seq.clear()
        //synth.onsilence(synth.dispose())
      console.group("PLAYSCALE");
      //console.log("SCALE:", scaleNotesAtfreqs);
        console.log(seq.get())
        console.log(synth.get())
        console.log(seq.context);
        console.log(seq.state)
        //console.log(seq.get(seq. cl))
      console.groupEnd();
      }, 2).then((buffer) => {
          console.log("buffer:", buffer)
      })     //}

      //if (scaleRef.current === scale) {
      //    seq.dispose()

      //}
  }
    
};
