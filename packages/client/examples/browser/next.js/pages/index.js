import React, { useState, useReducer } from 'react'
import { Web3Storage } from 'web3.storage'

export default function Home() {
  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [uploadName, setName] = useState('')
  const [files, setFiles] = useState([])
  const token = process.env.NEXT_PUBLIC_API_KEY
  const endpoint = new URL("https://api-staging.web3.storage")

  async function handleSubmit(event) {
    // don't reload the page!
    event.preventDefault()

    showMessage('> 📦 creating web3.storage client')
    const client = new Web3Storage({ token, endpoint })

    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const cid = await client.put(files, {
      onRootCidReady: localCid => {
        showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
        showMessage('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: bytes => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
      name: uploadName
    })
    showMessage(`> ✅ web3.storage now hosting ${cid}`)
    showLink(`https://dweb.link/ipfs/${cid}`)

    showMessage('> 📡 fetching the list of all unique uploads on this account')
    let totalBytes = 0
    for await (const upload of client.list()) {
      showMessage(`> 📄 ${upload.cid}  ${upload.name}`)
      totalBytes += upload.dagSize || 0
    }
    showMessage(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
  }

  function showLink(url) {
    showMessage(<span>&gt; 🔗 <a href={url}>{url}</a></span>)
  }

  return (
    <>
      <header>
        <h1>⁂
          <span>web3.storage</span>
        </h1>
      </header>
      <form id='upload-form' onSubmit={handleSubmit}>
        <label htmlFor='uploadName'>Name of your upload</label>
        <input type='text' id='uploadName' onChange={e => setName(e.target.value)} />
        <label htmlFor='filepicker'>Pick files to store</label>
        <input type='file' id='filepicker' name='fileList' onChange={e => setFiles(e.target.files)} multiple />
        <label htmlFor='folderpicker'>Pick folder to store</label>
        <input type='file' id='folderpicker' name='folderList' onChange={e => setFiles(e.target.files)} multiple webkitdirectory='true' />
        <input type='submit' value='Submit' id='submit' />
      </form>
      <div id='output'>
        &gt; ⁂ waiting for form submission...
        {messages.map((m, i) => <div key={m + i}>{m}</div>)}
      </div>
    </>
  )
}
