import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/theme/dracula.css'

import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
const ACTIONS = require("../Actions")

export const EditorComponent = ({socketRef, roomId, onCodeChange}) => {
    const codeEditorRef = useRef(null);
    useEffect(() => {
        const AddCodeMirrror = async () => {
            codeEditorRef.current = Codemirror.fromTextArea(document.getElementById("CodeEditor"), {
                mode: { name: "javascript", json: true },
                theme: "dracula",
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: false
            })

            codeEditorRef.current.on("change",(instance, changes)=>{
                const { origin } = changes
                const code = instance.getValue();
                onCodeChange(code)
                if(origin !== 'setValue'){
                    socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                        roomId,code,
                    })
                }
            })
        }
        AddCodeMirrror()
    }, [])

    useEffect(()=>{
        if(socketRef.current){
            socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
                if(code !== null){
                    codeEditorRef.current.setValue(code)
                }
            })
        }

        return ()=>{
            socketRef.current.off(ACTIONS.CODE_CHANGE)
        }
    },[socketRef.current])



    return (
        <textarea id='CodeEditor'></textarea>
    )
}
