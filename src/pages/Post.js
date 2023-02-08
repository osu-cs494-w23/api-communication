import React, { useState } from 'react'

const userId = 1234

async function sendPost(title, body, userId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    const responseBody = await response.json()
    console.log("== response body:", responseBody)
}

function Post() {
    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")

    return (
        <form onSubmit={e => {
            e.preventDefault()
            sendPost(title, body, userId)
        }}>
            <div>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default Post
