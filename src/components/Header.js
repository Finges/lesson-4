import React from 'react'

import './Header.css'
import {Link} from 'react-router-dom'

const Header = (props) => {
  return (
    <header>
      <h1>
        <span className='car-word'><Link to='/'>Pauline's</Link></span>
        <span className='cdr-word'>Perfect Patisserie</span>
        <span><Link to='/basket'>Basket</Link></span>
      </h1>
    </header>
  )
}

export default Header
