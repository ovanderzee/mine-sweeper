import { useEffect, useRef, useState } from 'react'
import './ElasticBrace.css'

const ElasticBrace = () => {
  const keptMargins = 4
  const braceRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<SVGSVGElement>(null)

  const [bridgeLength, setBridgeLength] = useState(0)

  useEffect(() => {
    if (braceRef.current && squareRef.current) {
      const svgReservation = 3 * squareRef.current.getBoundingClientRect().height;
      const braceTotal = braceRef.current.getBoundingClientRect().height

      const reqLen = (braceTotal - svgReservation) / 2
      setBridgeLength(reqLen + keptMargins)
    }
  }, [bridgeLength])

  return (<div className="elastic-brace" ref={braceRef}>

    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ref={squareRef}>
      <g>
        <path d="m 2,8 c 3.3137085,0 6,2.686292 6,6" />
      </g>
    </svg>

    <svg width="16" height="16" viewBox="0 0 16 16" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <g>
        <line x1="8" y1="2" x2="8" y2={2 - bridgeLength} />
        <path d="M 8,14 C 8,10.686292 10.686292,8 14,8 10.686292,8 8,5.3137085 8,2" />
        <line x1="8" y1="14" x2="8" y2={14 + bridgeLength} />
      </g>
    </svg>

    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 8,2 C 8,5.3137085 5.3137085,8 2,8" />
      </g>
    </svg>

  </div>)

}

export default ElasticBrace
