import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Notes extends React.Component {
    render() {

        // Set root for data
        const notes = this.props.data.allNotes.nodes

        return (
            <Layout title="theAdhocracy | Notes" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Explore My Notes</h1>
                    </header>
                    <main>
                        {notes.map(note => (
                            <section className={"note"}>
                                <header>
                                    <h2><a href={note.source}>{note.title}</a>{note.attribution ? <> | <span className={"attributed_to"}>{note.attribution}</span></> : ""}</h2>
                                </header>
                                <article dangerouslySetInnerHTML={{ __html: `${note.body}` }} />
                                <footer>
                                    <Link to={`/notes/${note.slug}`}><span role="img" title="Permalink to note" aria-label="Link icon">🔗</span></Link>
                                    <span role="img" title="Date published" aria-label="Date published">📆 {note.date} </span>
                                    <ul className="flat-list">{note.categories.map(category => <li><strong>{category}</strong></li>)}{note.tags.map(tag => <li>{tag}</li>)}</ul>
                                </footer>
                            </section>
                        ))}
                        {notes.count < 16 ? <PageNav page={this.props.pageContext} root="notes/" /> : ""}
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Notes

export const query = graphql`
	{
        allNotes{
            nodes {
                title
                slug
                date(formatString: "DD MMM YYYY")
                categories
                tags
                source
                attribution
                body
            }
        }
	}
`
