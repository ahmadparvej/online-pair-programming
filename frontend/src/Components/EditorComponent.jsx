import React, { useEffect } from 'react'
import Codemirror from 'codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/theme/dracula.css'
export const EditorComponent = () => {
    useEffect(() => {
        const AddCodeMirrror = async () => {
            Codemirror.fromTextArea(document.getElementById("CodeEditor"), {
                // mode: { name: "javascript", json: true },
                // theme: "dracula",
                // autoCloseTags: true,
                // autoCloseBrackets: true,
                lineNumbers: true
            })
        }
        AddCodeMirrror()
    }, [])
    return (
        <textarea id='CodeEditor'></textarea>
    )
}
