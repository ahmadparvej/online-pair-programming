import { Routes, Route } from 'react-router-dom';
import {Home} from './Pages/Home';
import {CreateRoom} from './Pages/CreateRoom';
import {Editor} from './Pages/Editor';
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/create' element={<CreateRoom />} ></Route>
                <Route path='/editor/:roomId' element={<Editor />} ></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
