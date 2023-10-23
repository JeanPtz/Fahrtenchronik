import './App.css'
import Header from './components/Header'
import SearchPage from './layout/SearchPage'
import AboutPage from './layout/AboutPage'
import SelectPage from './layout/SelectPage'
import AddPage from './layout/AddPage'
import RoutePage from './layout/RoutePage'

import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<Navigate to="/search" />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='select' element={<SelectPage />} />
        <Route path='select/:licenseplate' element={<RoutePage />} />
        <Route path='add' element={<AddPage />} />
        <Route path='about' element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App
