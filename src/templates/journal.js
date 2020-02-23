import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

class Journal extends React.Component {
    render() {

        // Set root for data
        const entries = this.props.data.allJournals.nodes

        // Create variable to track month values; allows month headers to be placed correctly.
        let loopMonth = ""

        return (
            <Layout title="theAdhocracy" sidebar={false}>
                <section id="content">
                    <header>
                        <h1>Journal Entries</h1>
                    </header>
                    <main className="content-grid">
                        {entries.map((entry) => {
                            if (entry.month === loopMonth) {
                                return (
                                    <Card post={entry} type="journal" />
                                )
                            } else {
                                loopMonth = entry.month
                                return (
                                    <>
                                        <div className="journal-section">
                                            <h2>{entry.month}</h2>
                                            {/* TODO: Create calendar component to sit here; allow it to highlight which days have posts */}
                                        </div>
                                        <Card post={entry} type="journal" />
                                    </>
                                )
                            }
                        })}
                        {entries.count < 13 ? <PageNav page={this.props.pageContext} root="journal/" /> : ""}
                    </main>
                </section>
            </Layout>
        )
    }
}

export default Journal

export const query = graphql`
	{
        allJournals {
            nodes {
                title
                slug
                date(formatString: "DD MMM YYYY")
                weekday
                day
                month
                year
                dateSuffix
                snippet
                tags
            }
        }
	}
`
