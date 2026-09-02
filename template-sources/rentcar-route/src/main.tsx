import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MOTION } from './variant'

/* 애니메이션 없는 기본형이면 CSS 전환까지 한 번에 끕니다 */
document.documentElement.dataset.motion = MOTION ? 'on' : 'off'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
