import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';
import { HashRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './components/redux/store/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <HashRouter basename="/test-ecosystem/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </StrictMode>,
);
