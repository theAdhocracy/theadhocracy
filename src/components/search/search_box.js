import React from "react"
import { connectSearchBox, connectRefinementList, connectCurrentRefinements } from "react-instantsearch-dom"

import styles from "./search.module.css"

const handleFocus = (event) => event.target.select()
const updateQuery = (query, filter) => {
	window.history.replaceState(null, null, filter && filter.length ? `?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter).replace(/%20/g, "+")}` : query ? `?query=${encodeURIComponent(query)}` : "?")
}

const userSearch = (event, refine) => {
	let currentQuery = getSearch()
	refine(event.currentTarget.value)
	updateQuery(event.currentTarget.value, currentQuery.filter)
}

const userFilter = (filter, refine) => {
	let currentQuery = getSearch()
	refine(filter)
	updateQuery(currentQuery.query === null ? "" : currentQuery.query, filter)
}

const getSearch = () => {
	let currentSearch = new URLSearchParams(window.location.search)
	let parameters = { query: currentSearch.get("query"), filter: currentSearch.get("filter") }
	return parameters
}

const resetSearch = (refine, items) => {
	refine(items)
	updateQuery("")
}

const ClearAll = ({ items, refine }) => {
	return (
		<button onClick={() => resetSearch(refine, items)} type="button" title="Reset search">
			<span role="img" aria-label="Reset">
				🔄
			</span>
		</button>
	)
}

const ClearAllButton = connectCurrentRefinements(ClearAll)

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
	return (
		<>
			<form className={styles.search_box} noValidate role="search" onSubmit={(e) => e.preventDefault()}>
				<input type="search" value={currentRefinement} onChange={(event) => userSearch(event, refine)} placeholder="Search archives" onClick={handleFocus} />
				<ClearAllButton clearsQuery />
			</form>
			{isSearchStalled ? <p>Sorry, search is stalling, please wait a moment.</p> : ""}
		</>
	)
}

const CategoryFilter = ({ items, refine }) => {
	return (
		<ul className={styles.category_list}>
			{items.map((item) => (
				<li key={item.label}>
					<label style={{ backgroundColor: item.isRefined ? "var(--yellow)" : "var(--green)" }}>
						<input type="checkbox" onClick={(event) => userFilter(item.value, refine)} />
						{item.label} <span style={{ borderColor: item.isRefined ? "var(--yellow)" : "var(--green)" }}>{item.count}</span>
					</label>
				</li>
			))}
		</ul>
	)
}

export const CustomSearchBox = connectSearchBox(SearchBox)

export const CustomCategoryFilter = connectRefinementList(CategoryFilter)
