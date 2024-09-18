import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import axios from 'axios'
import { CsrfToken } from './types'
import Note from './components/Note'

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const setCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    setCsrfToken()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/note" element={<Note />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
