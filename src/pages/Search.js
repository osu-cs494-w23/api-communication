import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Spinner from '../components/Spinner'
import ErrorContainer from '../components/ErrorContainer'
import useReposSearch from '../hooks/useReposSearch'

function Search({ query }) {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ inputQuery, setInputQuery ] = useState(searchParams.get("q") || "")

    const [ repos, loading, error ] = useReposSearch(searchParams.get("q"))

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
            }}>
                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <h2>Search query: {searchParams.get("q")}</h2>
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
