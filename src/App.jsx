import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './redux/store/store'
import './App.css'

// components 
import ProductsListPage from './pages/productsList'
import ProductDetailPage from './pages/productDetails'



function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Product Management</h1>
          <Routes>
            <Route path="/" element={<ProductsListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
