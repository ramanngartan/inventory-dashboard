
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import Products from './pages/Product.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" />
      <Route path="*" element={<NotFound />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      
    </Routes>
  )
}

export default App
