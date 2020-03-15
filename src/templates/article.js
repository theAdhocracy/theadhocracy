import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo/seo"

import "../styles/article.css"

export default ({ data }) => {
    const post = data.article
    const body = post.body.replace(/<sup>\[([0-9]*)\]<\/sup>/gi, '<sup id="index$1"><a href="#footnote$1" title="Jump to footnote.">[$1]</a></sup>')

    return (
        <Layout>
            <SEO
                title={post.title}
            />
            <main id="content" class="article h-entry">
                <header>
                    <h1 className="article-header p-name">{post.title}</h1>
                </header>
                <article className="full-width">
                    <ul className="article-details left-side">
                        <li>Updated</li>
                        <li className="dt-updated">{post.date}</li>
                        <li>Published</li>
                        <li className="dt-published">{post.date}</li>
                        <li>Categories</li>
                        <li>
                            {post.categories.map(category => <a>{category}, </a>)}
                        </li>
                        <li>Tags</li>
                        <li>
                            {post.tags.map(tag => <a>{tag}, </a>)}
                        </li>
                    </ul>
                    <div id="article-body" className="e-content" dangerouslySetInnerHTML={{ __html: body }} />
                    <section className="footnotes">
                        {post.footnotes.length >= 1 ? <h2>Footnotes</h2> : null}
                        {post.footnotes.map((footnote, index) => {
                            let position = index + 1
                            return <aside id={`footnote${position}`} dangerouslySetInnerHTML={{ __html: footnote.replace(/^<p>(.*)<\/p>$/gi, '<p>$1 <a class="footnote-return" href="#index' + position + '" title="Return to previous location in article.">⬆️</a></p>') }} />
                        })}
                    </section>
                </article>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        article(slug: {eq: $slug }) {
            title
            body
            footnotes
            categories
            tags
            date(formatString: "DD MMMM YYYY")
        }
    }
`