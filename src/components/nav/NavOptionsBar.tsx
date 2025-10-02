import './NavOptionsBar.css'

interface NavOptionsBarProps {
  children: React.ReactNode,
}

const NavOptionsBar = (props: NavOptionsBarProps) => {
  return (
    <nav><div className="sticky-slider">
      {props.children}
    </div></nav>
  )
}

export default NavOptionsBar
