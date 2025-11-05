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
        <div className="min-h-screen bg-gray-50 p-4">
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
