import React from "react"
import { animated, useSpring } from "react-spring"

function Springy() {
  const [springify, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 750, friction: 20 } }))

  <animated.div
    onMouseMove={({ clientX: x, clientY: y }) => set({ xys: animHelpers.calc(x, y) })}
    onMouseLeave={() => set({ xys: [0, 0, 1] })}
    style={springify}
  >
    Hello there
  </animated.div>
}
