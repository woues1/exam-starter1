import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as authContext from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
<authContext.AuthProvider>
<App />
</authContext.AuthProvider>
)