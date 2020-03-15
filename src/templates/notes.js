import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageNav from "../components/page_nav"

// CSS
import "../styles/note.css"

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
                            <section className="note">
                                <header>
                                    <h2><a href={note.source}>{note.title}</a>{note.attribution ? <> | <span className={"attributed_to"}>{note.attribution}</span></> : ""}</h2>
                                </header>
                                <article dangerouslySetInnerHTML={{ __html: `${note.body}` }} />
                                <footer>
                                    <p><span role="img" title="Date published" aria-label="Date published">📆</span> {note.date}  &nbsp;|&nbsp;<Link to={`/notes/${note.slug}`}><span role="img" title="Permalink to note" aria-label="Link icon">🔗</span></Link></p>
                                    <ul className="flat-list">{note.categories.map(category => <li><strong>{category},&nbsp;</strong></li>)}{note.tags.map((tag, index, array) => (index < array.length - 1 ? <li>{tag},&nbsp;</li> : <li>{tag}</li>))}</ul>
                                </footer>
                            </section>
                        ))}
                        <PageNav currentPage={this.props.pageContext.currentPage} totalPages={this.props.pageContext.numNotesPages}  pageRoot="notes/" />
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Notes

export const query = graphql`
query AllNotesQuery($skip: Int!, $limit: Int!) {
        allNotes(
            limit: $limit
            skip: $skip
        ){
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
