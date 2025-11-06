import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './redux/store/store'
import './App.css'

// Pages 
import ProductsListPage from './pages/productsList'
import ProductDetailPage from './pages/productDetails'
import NotFoundPage from './pages/notFound'



function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen p-4 bg-linear-to-br from-sky-50 via-blue-50 to-blue-100 text-gray-800">
          <h1 className="text-2xl font-bold text-center mb-6">Product Management</h1>
          <Routes>
            <Route path="/" element={<ProductsListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
