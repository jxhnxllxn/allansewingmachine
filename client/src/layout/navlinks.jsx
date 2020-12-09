import React from 'react'
import { NavLink } from 'react-router-dom'
const NavLinks = ({ links, addStyle }) => {
  return (
    <ul className='navlinks' style={{ ...addStyle }}>
      {links.map((i) => (
        <li key={i.name}>
          <NavLink exact to={i.linkTo} exact={i.exact}>
            <span>{i.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
