import { useRef, useState, FC } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei';
import * as random from "maath/random";

export const Background: FC=(props: ThreeElements['points'])=> {

    //TODO: Change Color based on selected chord
    const [color, setColor] = useState('#D3C0D2')

    const pointRef = useRef<THREE.Points>(null!)
    const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 1.5 }))


  useFrame((_state, delta) => {
    pointRef.current.rotation.x -= delta / 10
    pointRef.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointRef} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color={color} size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
