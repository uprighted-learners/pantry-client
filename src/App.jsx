import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/headerFooterPage/Header'
import Footer from './components/headerFooterPage/Footer'
import About from './components/aboutPage/About'
import GetInvolved from './components/getInvolvedPage/GetInvolved'
import Home from './components/homePage/Home'
import RsrcList from './components/resourcesPage/RsrcList'
import SearchBar from './components/homePage/SearchBar'
import AdminDash from './components/adminPage/AdminDash'
import ProtectedRoute from './components/ProtectedRoute'
import UserDash from './components/userPage/UserDash'



function App() {
    return (
        <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/getinvolved" element={<GetInvolved />} />
                <Route element={<ProtectedRoute isAdminRequired={true} />}>
                  <Route path="/admin/*" element={<AdminDash />} />                    
                </Route>
                <Route path="/user-dashboard" element={<UserDash />} />
                <Route path="/about" element={<About />} />
                <Route path="/resources" element={<RsrcList />} />
              </Routes>
              <Footer />
        </BrowserRouter>
    )
}

export default App;


