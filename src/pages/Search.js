import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function Search({ query }) {
    const [ inputQuery, setInputQuery ] = useState(query || "")
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ repos, setRepos ] = useState([])

    // console.log("== repos:", repos)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchSearchResults() {
            let responseBody = {}
            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${query}&sort=stars`,
                    { signal: controller.signal }
                )
                responseBody = await response.json()
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP request cancelled")
                } else {
                    throw e
                }
            }

            if (!ignore) {
                setRepos(responseBody.items || [])
            }
        }
        if (query) {
            fetchSearchResults()
        }
        return () => {
            ignore = true
            controller.abort()
        }
    }, [ query ])

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
            }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <h2>Search query: {query}</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url}>{repo.full_name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Search
