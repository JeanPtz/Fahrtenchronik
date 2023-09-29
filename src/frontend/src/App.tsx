import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import SearchPage from './layout/SearchPage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<Navigate to="/search" />} />
        <Route path='search' element={<SearchPage/>}/>
        <Route path='select' />
        <Route path='add' />
        <Route path='about' />
      </Routes>
    </>
  )
}

export default App
