import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Premium } from './pages/Premium';
import { Stream } from './pages/Stream';
import { Party } from './pages/Party';
import { PlaceholderPage } from './components/PlaceholderPage';
const basename = import.meta.env.MODE === 'production' ? '/gamor-app' : '';
function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="stream" element={<Stream />} />
          <Route path="party" element={<Party />} />
           <Route path="premium" element={<Premium />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />  
          <Route path="*" element={<PlaceholderPage title="404" message="Page not found" />} />    
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;