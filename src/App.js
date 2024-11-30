
import './App.css';

import React, { useState } from 'react'
import NavBar from './Components/Navbar.js';
import News from './Components/News.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  // const apiKey = process.env.REACT_APP_NEWS_API
  const apiKey = "c5be287bb0ee4f849b50c4c73ce80a86"

  const [progress, setProgress] = useState(0)
 
    return (
      <div>
       <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route 
            exact 
            path="/"  
            element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} 
          />
          <Route 
            exact 
            path="/business" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />}
          />
          <Route 
            exact 
            path="/entertainment" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} 
          />
          <Route 
            exact 
            path="/general" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} 
          />
          <Route 
            exact 
            path="/health" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} 
          />
          <Route 
            exact 
            path="/science" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} 
          />
          <Route 
            exact 
            path="/sports" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} 
          />
          <Route 
            exact 
            path="/technology" 
            element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} 
          />
        </Routes>
      </Router>
      </div>
    )
 
}

export default App;
