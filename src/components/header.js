import React from 'react'
import { Link } from 'gatsby'

export default (props) => (
    <>
        <header id="header">
            <Link to="/">
                <img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Logos/adhoc-face.svg" alt="Stylised, cartoon version of Murray Adcock's face." />
                <h1>theAdhocracy</h1>
            </Link>
        </header>
        <nav id="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/about/">About</Link></li> */}
                <li><Link to="/articles/">Articles</Link></li>
                {/* <li>Portfolio</li>
                <li>Contact</li> */}
            </ul>
        </nav>
    </>
)