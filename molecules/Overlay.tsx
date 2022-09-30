import React, { FC, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { Select } from "../templates/Select";
import { useKey } from "../context/main-context";
import { ChordsDisplay } from "../templates/ChordsDisplay";
import { Canvas } from "@react-three/fiber";
import { Text3D, Float, Center } from "@react-three/drei";
import { dankFont } from "../atoms/getDankFont";
import * as THREE from "three";

export const Overlay: FC = () => {
  {
    /*______________CONTEXT_&_REFS________________*/
  }
  ///////////////////CONTEXT////////////////////////
  const { selectedKey } = useKey();
  ///////////////////REF////////////////////////
  const textRef = useRef(null!);

  {
    /*______________JSX________________*/
  }

  return (
    <div className={styles.containerOverlay}>
      <div className={styles.title}>
        <Canvas
          className={styles.headerCanvas}
          camera={{ position: [-1, 0, 10] }}
        >
          <Center>
            <Float
              floatIntensity={3}
              rotationIntensity={0.3}
              floatingRange={[0, 0.05]}
              speed={3}
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.25} penumbra={20} />
              <pointLight position={[-10, -10, -10]} />
              <Text3D
                ref={textRef}
                font={dankFont}
                size={3}
                curveSegments={2}
                bevelSegments={1}
                bevelSize={0.03}
              >
                The Nashville Numbers
                <meshPhysicalMaterial color="orange" side={THREE.DoubleSide} />
              </Text3D>
            </Float>
          </Center>
        </Canvas>
      </div>
      <div className={styles.selectContainer}>
        {selectedKey ? (
          <div className={styles.chordsDisplay}>
            <ChordsDisplay />
          </div>
        ) : null}
        <Select />
      </div>
    </div>
  );
};
