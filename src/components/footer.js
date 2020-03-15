import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default (props) => {

    // Creating Human Era Year
    const today = new Date()
    const yearAD = today.getFullYear()
    const yearHE = (yearAD + 10000).toString().replace(/^([0-9][0-9])/, "$1,")

    // Get Version Number
    const data = useStaticQuery(graphql`query {
        site {
          siteMetadata {
            version
          }
        }
      }`)
    const version = data.site.siteMetadata.version

    return (
        <footer id="footer">
            <section>
                <h1>Made By Me, But Made Possible By:</h1>
                <p>CMS: <a href="https://craftcms.com/"><img className="wide-logo" src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/craft-logo.svg" alt="Craft CMS" /></a></p>
                <p>Build: <a href="https://www.gatsbyjs.org/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/gatsby-logo.svg" alt="Gatsby" /></a></p>
                <p>Deployment: <a href="https://github.com/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/github-logo.svg" alt="GitHub" /></a></p>
                <p>Hosting: <a href="https://www.netlify.com/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/netlify-logo.svg" alt="Netlify" /></a></p>
            </section>
            <section>
                <h1>Connect With Me:</h1>
                <p>Twitter <a href="https://twitter.com/theadhocracy" rel="me"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/twitter-logo.svg" alt="Twitter" /></a></p>
                <p>Instagram <a href="https://instagram.com/theadhocracy" rel="me"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/instagram-logo.svg" alt="Instragram" /></a></p>
                <p>500px <a href="https://500px.com/theadhocracy" rel="me"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/500px-logo.svg" alt="500px" /></a></p>
                <p>GitHub <a href="https://github.com/theadhocracy" rel="me"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/github-logo.svg" alt="GitHub" /></a></p>
            </section>
            <section>
                <h1>Keep Up To Date:</h1>
                <p>All Posts <a href="/rss.xml"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/rss-icon.svg" alt="RSS" /></a></p>
                <p>Articles <a href="/rss-articles.xml"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/rss-icon.svg" alt="RSS" /></a></p>
                <p>Reviews <a href="/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/rss-icon.svg" alt="RSS" /></a></p>
                <p>Notes <a href="/"><img src="https://cms.theadhocracy.co.uk/assets/theadhocracy/website/Icons/rss-icon.svg" alt="RSS" /></a></p>
            </section>
            <p className="copyright"><a href="https://www.youtube.com/watch?v=czgOWmtGVGs">&copy; {yearHE} HE</a> <span>|</span> <a href="https://github.com/theAdhocracy/theadhocracy"><span>&#9419;</span> {version}</a></p>
        </footer>
    )
}