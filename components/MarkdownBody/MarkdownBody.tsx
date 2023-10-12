'use client'

import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import './github.css'
import './custom.css'
import remarkGfm from 'remark-gfm'

type MarkdownBodyProps = {
    filePath?: string,
    rawText?: string
}

const MarkdownBody = ({ filePath = '', rawText = ''}: MarkdownBodyProps) => {

    const [mdfile, setMdfile] = useState<string>(rawText ?? '')

    useEffect(() => {
        if (filePath)
        fetch(filePath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                setMdfile(text)
            })
            .catch(err => {
                setMdfile('')
            })
    }, [])

    if (mdfile) {
        return(<Markdown className={'markdown-body'} remarkPlugins={[remarkGfm]}>{mdfile}</Markdown>)
    } else if (rawText) {
        return(<Markdown className={'markdown-body'} remarkPlugins={[remarkGfm]}>{rawText}</Markdown>)
    }

    return(<div/>)
}

export default MarkdownBody;