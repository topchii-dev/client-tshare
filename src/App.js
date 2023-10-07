import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/register-form';
import Home from './components/home';
import LoginForm from './components/login-form';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
