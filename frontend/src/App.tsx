import React from 'react'
import {
  LoginScreen,
  PublicationScren,
  PublicationsScreen,
  RegisterScreen,
} from './screens'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks'
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

function App() {
  useAuth()

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/publication/:id" element={<PublicationScren />} />
        <Route path="/" element={<PublicationsScreen />} />
      </Routes>
    </>
  )
}

export default App
