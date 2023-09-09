import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CheckAuth from './utils/CheckAuth.jsx'
import CheckGuest from './utils/CheckGuest.jsx'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store.js'

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <CheckAuth><Home /></CheckAuth>
            },
            {
                path: '/login',
                element: <CheckGuest><Login /></CheckGuest>
            },
            {
                path: '/register',
                element: <CheckGuest><Register /></CheckGuest>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
