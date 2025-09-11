import { Center, Flex, Image, MantineProvider, Stack } from "@mantine/core"
import "./App.css"
import "@mantine/core/styles.css"
import { useState, useEffect } from "react"
import { useRef } from "react"

function App() {
  const numBoxRef = useRef<HTMLDivElement>(null)
  function makeArray() {
    let arr = [] as number[]
    for (let i = 10000; i > 0; i--) {
      arr.push(Math.floor(Math.random() * 10))
    }
    return arr
  }

  const [array, setArray] = useState<number[]>([])
  useEffect(() => {
    setArray(makeArray())
  }, [])

  const [selected, setSelected] = useState<[number, number][]>([])
  const [replaced, setReplaced] = useState<{ [key: string]: boolean }>({})

  const [percs, setPercs] = useState<number[]>([0, 0, 0, 0, 0])

  useEffect(() => {
    if (array.length && numBoxRef.current) {
      const el = numBoxRef.current
      el.scrollLeft = el.scrollWidth / 2 - el.clientWidth / 2
      el.scrollTop = el.scrollHeight / 2 - el.clientHeight / 2
    }
  }, [array])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault()
        setReplaced((prev) => {
          const next = { ...prev }
          selected.forEach(([x, y]) => {
            const elem = document.querySelector(
              `[data-row='${x}'][data-col='${y}']`
            ) as HTMLElement
            const elemPos = elem.getBoundingClientRect()
            if (elem) {
              const box = Math.floor(Math.random() * 5)
              const boxId = `b${box + 1}`
              const boxElem = document.getElementById(boxId)
              setPercs((prev) => {
                const next = [...prev]
                next[box] += Math.floor(Math.random() * 5)
                return next
              })
              if (boxElem) {
                const boxRect = boxElem.getBoundingClientRect()
                const startX = elemPos.left + elemPos.width / 2
                const startY = elemPos.top + elemPos.height / 2
                const endX = boxRect.left + boxRect.width / 2
                const endY = boxRect.top + boxRect.height / 2

                const clone = elem.cloneNode(true) as HTMLElement
                clone.style.position = "fixed"
                clone.style.left = `${startX}px`
                clone.style.top = `${startY}px`
                clone.style.pointerEvents = "none"
                clone.style.zIndex = "9999"
                clone.style.fontSize = "1.4em"
                clone.style.transition =
                  "transform 0.7s cubic-bezier(.7,.2,.3,1), opacity 1s"
                clone.style.transform = "translate(0, 0)"
                document.body.appendChild(clone)

                requestAnimationFrame(() => {
                  clone.style.transform = `translate(${endX - startX}px, ${
                    endY - startY
                  }px) scale(1.5)`
                  clone.style.opacity = "0"
                })

                setTimeout(() => {
                  clone.remove()
                }, 800)
              }
            }
          })
          selected.forEach(([row, col]) => {
            next[`${row},${col}`] = true
          })
          return next
        })
        setSelected([])
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selected])

  const [hex] = useState(
    () =>
      "0x" +
      Math.floor(Math.random() * 0xffffffff)
        .toString(16)
        .padStart(8, "0")
  )

  const keyframesArr = useRef<string[][]>([])
  const animParamsArr = useRef<{ duration: string; delay: string }[][]>([])
  if (keyframesArr.current.length === 0 && array.length >= 1600) {
    keyframesArr.current = Array.from({ length: 40 }).map((_, i) =>
      array.slice(i * 40, (i + 1) * 40).map((_, j) => {
        const xSign = Math.random() > 0.5 ? 1 : -1
        const ySign = Math.random() > 0.5 ? 1 : -1
        return `@keyframes wobble_${i}_${j} {
          0% { transform: translateX(0) translateY(0) rotate(-2deg) scale(1); }
          10% { transform: translateX(${8 * xSign}px) translateY(${
          4 * ySign
        }px) rotate(2deg) scale(1.05); }
          20% { transform: translateX(${-6 * xSign}px) translateY(${
          -5 * ySign
        }px) rotate(-3deg) scale(0.98); }
          30% { transform: translateX(${12 * xSign}px) translateY(${
          7 * ySign
        }px) rotate(3deg) scale(1.07); }
          40% { transform: translateX(${-10 * xSign}px) translateY(${
          -8 * ySign
        }px) rotate(-2deg) scale(0.96); }
          50% { transform: translateX(${16 * xSign}px) translateY(${
          10 * ySign
        }px) rotate(2deg) scale(1.1); }
          60% { transform: translateX(${-14 * xSign}px) translateY(${
          -7 * ySign
        }px) rotate(-3deg) scale(0.97); }
          70% { transform: translateX(${10 * xSign}px) translateY(${
          5 * ySign
        }px) rotate(2deg) scale(1.05); }
          80% { transform: translateX(${-8 * xSign}px) translateY(${
          -4 * ySign
        }px) rotate(-2deg) scale(0.99); }
          90% { transform: translateX(${5 * xSign}px) translateY(${
          2 * ySign
        }px) rotate(1deg) scale(1.02); }
          100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
        }`
      })
    )
    animParamsArr.current = Array.from({ length: 40 }).map((_, i) =>
      array.slice(i * 40, (i + 1) * 40).map((_, j) => {
        return {
          duration: (6 + Math.random() * 4).toFixed(2) + "s",
          delay: (Math.random() * 10).toFixed(2) + "s",
        }
      })
    )
  }

  return (
    <MantineProvider forceColorScheme="dark">
      <Stack w="95vw" h="100vh">
        <Flex className="topbar" justify="space-between">
          <div>Djungelskog</div>
          <div style={{ position: "relative" }}>
            0% Complete
            <Image
              className="lulog"
              src="https://lumonmerchandising.com/cdn/shop/files/lumon_logo-black-png_4a7c637e-96dd-45e7-a02e-eba67561a7e7.png?v=1743065319"
              h="3.6em"
              w="auto"
              pos="absolute"
              top="-1em"
              right="-6.5em"
            />
          </div>
        </Flex>
        <div style={{ position: "relative" }}>
          <div className="line" style={{ position: "absolute", top: "-1em" }} />
          <div
            className="line"
            style={{ position: "absolute", top: "-0.4em" }}
          />
        </div>
        <div
          ref={numBoxRef}
          style={{
            height: "65vh",
            width: "100vw",
            overflow: "scroll",
            position: "relative",
            textWrap: "nowrap",
            scrollbarWidth: "none",
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => {
            const keyframes = keyframesArr.current[i]?.join("\n") ?? ""
            return (
              <div
                className="numblock"
                key={i}
                style={{
                  display: "flex",
                  gap: "1.2em",
                  fontFamily: "monospace",
                }}
              >
                <style>{keyframes}</style>
                {array.slice(i * 40, (i + 1) * 40).map((num, j) => {
                  const animParams = animParamsArr.current[i]?.[j] ?? {
                    duration: "8s",
                    delay: "0s",
                  }
                  const isSelected = selected.some(
                    ([row, col]) => row === i && col === j
                  )
                  const isReplaced = replaced[`${i},${j}`]
                  return (
                    <span
                      key={j}
                      className="number"
                      data-row={i}
                      data-col={j}
                      style={{
                        padding: "0 1em",
                        animation: `wobble_${i}_${j} ${animParams.duration} infinite`,
                        animationDelay: animParams.delay,
                        transform: isSelected ? "scale(1.35)" : undefined,
                      }}
                      onClick={() => {
                        if (!isSelected && !isReplaced) {
                          setSelected((prev) => [...prev, [i, j]])
                        }
                      }}
                    >
                      {isReplaced ? "\u00A0" : String(num).padStart(2, " ")}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div style={{ position: "relative" }}>
          <div className="line" style={{ position: "absolute", top: "-1em" }} />
          <div
            className="line"
            style={{ position: "absolute", top: "-0.4em" }}
          />
        </div>
        <Flex className="botbo" justify="space-between">
          <Stack w="14vw">
            <Center id="b1" className="box">
              01
            </Center>
            <div
              className="box"
              style={{
                background:
                  percs[0] > 0
                    ? `linear-gradient(90deg, rgb(151, 231, 255)  ${percs[0]}%, #00000000 ${percs[0]}%)`
                    : "",
              }}
            >
              {Math.floor(percs[0])}%
            </div>
          </Stack>
          <Stack w="14vw">
            <Center id="b2" className="box">
              02
            </Center>
            <div
              className="box"
              style={{
                background:
                  percs[1] > 0
                    ? `linear-gradient(90deg, rgb(151, 231, 255)  ${percs[1]}%, #00000000 ${percs[1]}%)`
                    : "",
              }}
            >
              {Math.floor(percs[1])}%
            </div>
          </Stack>
          <Stack w="14vw">
            <Center id="b3" className="box">
              03
            </Center>
            <div
              className="box"
              style={{
                background:
                  percs[2] > 0
                    ? `linear-gradient(90deg, rgb(151, 231, 255)  ${percs[2]}%, #00000000 ${percs[2]}%)`
                    : "",
              }}
            >
              {Math.floor(percs[2])}%
            </div>
          </Stack>
          <Stack w="14vw">
            <Center id="b4" className="box">
              04
            </Center>
            <div
              className="box"
              style={{
                background:
                  percs[3] > 0
                    ? `linear-gradient(90deg, rgb(151, 231, 255)  ${percs[3]}%, #00000000 ${percs[3]}%)`
                    : "",
              }}
            >
              {Math.floor(percs[3])}%
            </div>
          </Stack>
          <Stack w="14vw">
            <Center id="b5" className="box">
              05
            </Center>
            <div
              className="box"
              style={{
                background:
                  percs[4] > 0
                    ? `linear-gradient(90deg, rgb(151, 231, 255)  ${percs[4]}%, #00000000 ${percs[4]}%)`
                    : "",
              }}
            >
              {Math.floor(percs[4])}%
            </div>
          </Stack>
        </Flex>
        <Center style={{ fontSize: "1.2em", fontWeight: "bold" }} h="1.3em">
          {hex}
        </Center>
      </Stack>
    </MantineProvider>
  )
}

export default App
