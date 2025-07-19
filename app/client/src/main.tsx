import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // ✅ Fixed this line
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <App />
  </UserProvider>
);
