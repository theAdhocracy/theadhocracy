import React from "react"
import { graphql } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Hits } from "react-instantsearch-dom"
import { globalHistory } from "@reach/router"

import { CustomSearchBox, CustomCategoryFilter } from "../components/search/search_box"
import { CustomRatingMenu } from "../components/search/rating"
import Layout from "../components/layout"
import Card from "../components/content_card"
import PageNav from "../components/page_nav"

import "../styles/reviews.css"

export default ({}) => {
	// Set root for data

	// Search index keys
	const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
	const searchIndex = "theAdhocracy_Reviews"

	// Get URL
	let urlQuery = globalHistory.location.search ? decodeURIComponent(globalHistory.location.search.replace("?query=", "").replace(/&filter.*/, "")) : ""

	return (
		<Layout title="Reviews" sidebar={false}>
			<section id="content">
				<header>
					<h1>Latest Reviews</h1>
				</header>
				<InstantSearch indexName={searchIndex} searchClient={searchClient}>
					<CustomSearchBox defaultRefinement={urlQuery} label="reviews" />
					<section className="search_control">
						<CustomCategoryFilter attribute="node.type" limit={50} />
						<CustomRatingMenu attribute="node.rating" />
					</section>
					<Hits />
				</InstantSearch>
				<main className="content-grid">
					<a href="/reviews/2">Explore?</a>
				</main>
			</section>
		</Layout>
	)
}

// export const query = graphql`
// 	query AllReviewsQuery($skip: Int!, $limit: Int!) {
// 		allReviews(limit: $limit, skip: $skip, sort: { fields: [latestReview, updated], order: [DESC, DESC] }) {
// 			nodes {
// 				title
// 				slug
// 				desc
// 				date(formatString: "DD MMM YYYY")
// 				rating
// 				type
// 			}
// 		}
// 	}
// `
