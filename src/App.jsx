import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import router from './router/router';
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
