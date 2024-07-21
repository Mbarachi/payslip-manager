import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PayslipList from './pages/PayslipList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PayslipList />} />
      </Routes>
    </Router>
  );
}

export default App;
