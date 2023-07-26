import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Authentication from './components/Auth/Authentication'
import Create from './components/Create';
import BlogDetails from './components/BlogDetails';
import UpdateBlog from './components/UpdateBlog';
import SuperLogin from './superuser/SuperLogin';
import SuperHome from './superuser/SuperHome';
import SuperDetails from './superuser/SuperDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Auth' element={<Authentication/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/blog/:id' element={<BlogDetails/>}/> 
          <Route path='/update/:id' element={<UpdateBlog/>}/>
          <Route path='/super' element={<SuperLogin/>}/>
          <Route path='/superHome' element={<SuperHome/>} />
          <Route path='superHome/superDetails/:id' element={<SuperDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
