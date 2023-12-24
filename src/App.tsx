import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './container/landing/index';
import BlackJack from './container/blackjack/index';
import Room from './container/blackjack/room';
import Baccarat from './container/baccarat/index';
import { setSocket, connectToServer } from './websocket';
import { Provider } from 'react-redux';
import store from "./state/index";
import './App.css'

function App() {
  useEffect(() => {
    const connect = async () => {
      const ws = await connectToServer();
      setSocket(ws);
    }
    connect();
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Landing />} />
          <Route path="/blackjack" element={<BlackJack />} />
          <Route path="/blackjack/room/:id" element={<Room />} />
          <Route path="/baccarat" element={<Baccarat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
