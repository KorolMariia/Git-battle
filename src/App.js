import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';
import NotFound from './NotFound';
import Nav from './Nav';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Popular />} path="/popular" />
        <Route element={<Battle />} path="/battle" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
