import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'react-quill/dist/quill.snow.css';
import { Quizprovider } from './components/contextAPI/ApplicationContext.jsx';
createRoot(document.getElementById('root')).render(
  <Quizprovider>
    <App />
  </Quizprovider>
)
