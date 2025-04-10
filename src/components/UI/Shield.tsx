interface ShieldProps {
  colorSet: 'blue' | 'gold' | 'silver' | 'bronze',
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

export default Shield
