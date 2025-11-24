import { useEffect, useRef, useState } from 'react'
import './ElasticBrace.css'

const ElasticBrace = () => {
  const minBridgeLength = 12
  const braceRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<SVGElement>(null)

  const [bridgeLength, setBridgeLength] = useState(0)
  useEffect(() => {
    if (braceRef.current) {
      const svgReservation = 3 * squareRef.current.clientHeight;
      const braceTotal = braceRef.current.clientHeight
      const reqLen = (braceTotal - svgReservation) / 2
      setBridgeLength(Math.max(reqLen, minBridgeLength))
console.log( braceTotal, svgReservation, reqLen, '  (', bridgeLength , minBridgeLength, ')')
    }
  })

/*
  const div = <div className="elastic-brace" ref={braceRef}></div>
*/

  return (<div className="elastic-brace" ref={braceRef}>

    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" ref={squareRef}>
      <g>
        <path d="m 6,16 c 5.522847,0 10,4.477153 10,10" />
      </g>
    </svg>

    <svg width="32" height="32" viewBox="0 0 32 32" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <g>
        <line x1="16" y1="6" x2="16" y2={6 - ((bridgeLength * 2 ) + 12 )} />
        <path d="M 16,26 C 16,20.477155 20.477153,16 26,16 20.477153,16 16,11.52285 16,6" />
        <line x1="16" y1="26" x2="16" y2={26 + ((bridgeLength * 2 ) + 12 )} />
      </g>
    </svg>

    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="m 16,6 c 0,5.522846 -4.477153,10 -10,10" />
      </g>
    </svg>

  </div>)

}

export default ElasticBrace
