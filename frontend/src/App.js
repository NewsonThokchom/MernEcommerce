import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>


      <Header />

      <main className="py-3">
        <Container>
          {/* <Routes>
            <Route path='/' component={HomeScreen} exact />
          </Routes> */}

          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} /> {/*no need to use exact in react router v6*/}
            {/* <Route path="/cart/:id?" element={<CartScreen />} exact /> */}
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/" element={<HomeScreen />} />

          </Routes>
          {/* <HomeScreen /> */}
        </Container>
      </main>

      <Footer />




    </Router>

  );
}

export default App;
