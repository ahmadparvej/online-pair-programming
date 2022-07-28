import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CreateRoom } from '../Pages/CreateRoom'
import { Editor } from '../Pages/Editor'
import { Home } from '../Pages/Home'
export const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateRoom />} />
                <Route path='/editor/:roomID' element={<Editor />} />
            </Routes>
        </>
    )
}
