import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Spinner from '../components/Spinner'
import ErrorContainer from '../components/ErrorContainer'
import useReposSearch from '../hooks/useReposSearch'

function Search({ query }) {
    const [ inputQuery, setInputQuery ] = useState(query || "")
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ repos, loading, error ] = useReposSearch(query)

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
            {error && <ErrorContainer>An error occurred...</ErrorContainer>}
            {loading ? <Spinner /> : (
                <ul>
                    {repos.map(repo => (
                        <li key={repo.id}>
                            <a href={repo.html_url}>{repo.full_name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Search
