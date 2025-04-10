type ColorSet = 'blue' | 'gold' | 'silver' | 'bronze'

interface ShieldProps {
  colorSet: ColorSet,
  text?: string | number
}

const Shield = (props: ShieldProps) => {
  return (
    <svg className={`shield ${props.colorSet}`}>
        <use href="#shield" />
        {props?.text && <text x="50%" y="50%">{props.text}</text>}
    </svg>
  )
}

const ShieldByRank = (props: {rank: number; }) => {
  const colorSetMap: ColorSet[] = ['blue', 'gold', 'silver', 'bronze']
  const colorSet = colorSetMap[props.rank] || 'blue'
  return <Shield colorSet={colorSet} text={props.rank} />
}

export default Shield
export { ShieldByRank }
