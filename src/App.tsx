// App.tsx
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <Router basename="/portalVisitas">
      <AppRoutes />
    </Router>
  )
}

export default App
