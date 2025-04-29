type ColorSet = 'blue' | 'gold' | 'silver' | 'bronze'

interface ShieldProps {
  colorSet: ColorSet,
  text: string
}

const Shield = (props: ShieldProps) => {
  let fontSizeAdjust
  switch(props.text.length) {
    case 1: fontSizeAdjust = '125%'; break
    case 2: fontSizeAdjust = '100%'; break
    case 3: fontSizeAdjust = '75%'; break
    default: fontSizeAdjust = '0%'
  }

  return (
    <svg className={`shield ${props.colorSet}`}>
        <use href={`#shield_${props.colorSet}`} />
        {props?.text &&
          <text
            x="50%" y="50%"
            style={{'fontSize': fontSizeAdjust}}
          >{props.text}</text>}
    </svg>
  )
}

const ShieldByRank = (props: {rank: number; }) => {
  const colorSetMap: ColorSet[] = ['blue', 'gold', 'silver', 'bronze']
  const colorSet = colorSetMap[props.rank] || 'blue'
  return <Shield colorSet={colorSet} text={`${props.rank}`} />
}

export default Shield
export { ShieldByRank }
