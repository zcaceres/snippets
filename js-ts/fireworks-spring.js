import { animated, useSpring } from "react-spring";

const Fireworks = styled(animated.div)`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(76, 32, 60);
`

const [fireworkSpring] = useSpring(() => ({
    to: async(next) => {
      while (true) {
        await next({ transform: 'scale(3)', opacity: 0.3, left: `${animHelpers.getRandomInt(100)}%`, top: `${animHelpers.getRandomInt(100)}%` })
      }
    },
    from: { transform: 'scale(1)', opacity: 1 },
    config: {
      duration: 500,
    },
    reset: true,
  }))
