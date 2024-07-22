import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PayslipList from './pages/PayslipList';
import PayslipDetails from './pages/PayslipDetails';

function App() {
  return (
    <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <Router>
        <Routes>
          <Route path="/" element={<PayslipList />} />
          <Route path="/payslip/:id" element={<PayslipDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
