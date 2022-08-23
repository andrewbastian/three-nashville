import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import dank from "../design-assets/Dank_Mono_Regular.json";

export const dankFont = new FontLoader().parse(dank).data;


