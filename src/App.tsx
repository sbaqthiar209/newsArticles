import React,{ lazy, Suspense } from 'react';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
const Home = lazy(()=>import("./pages/home"))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
