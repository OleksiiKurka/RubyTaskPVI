import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import './App.css';
import MyCard from './components/MyCard/MyCard';
import { DataContext } from './Context/DataContext';




function App() {
  
    const {posts,GetPosts} = useContext(DataContext);
    useEffect(GetPosts,[]);

    return (
      <div >
        {
          posts.map(x=> <MyCard key={`cards`+x.id }data={x}></MyCard>)
        }
      </div>
    );
  }

export default App;
