import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/user/SignUp'
import IntroPage from './components/intro/IntroPage'

function App () {
  return (
    <div  className='bg-gray-900'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/intro' element={<IntroPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
