
interface HistogramProps {
  frequency: number[],
}

const Histogram = (props: HistogramProps) => {
  return (
    <table>
      <tbody><tr>
        {props.frequency.map((value: number, index: number) => (
          <th key={`f${index}`} className={`col${index} val${value}`}>{value}</th>
        ))}
      </tr><tr>
        {props.frequency.map((value: number, index: number) => (
          <td key={`i${index}`} className={`col${index} val${value}`}>{index}</td>
        ))}
      </tr></tbody>
    </table>
  )

}

export default Histogram
