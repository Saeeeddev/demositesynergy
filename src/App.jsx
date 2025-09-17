import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/website/Header'
import Footer from './components/website/Footer'
import Home from './components/page/Home'
import Security from './components/page/legal/Security'
import Privacy from './components/page/legal/Privacy'

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App
