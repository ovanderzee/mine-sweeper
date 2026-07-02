import { useContext } from 'react'
import PageContext from '../../store/page-context'
import './NavOptionsBar.css'

interface NavOptionsBarProps {
  children: React.ReactNode,
}

const NavOptionsBar = (props: NavOptionsBarProps) => {
  const pageCtx = useContext(PageContext)
  const config = pageCtx.config

  return (
    <nav className={config.VERBOSE_BTN ? 'verbose' : ''}><div className="sticky-slider">
      {props.children}
    </div></nav>
  )
}

export default NavOptionsBar
