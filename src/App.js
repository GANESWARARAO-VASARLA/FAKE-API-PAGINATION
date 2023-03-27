import React, { useState, useEffect } from 'react';
import CountriesTables from "./components/CountriesTables";
import './App.css';

function App(){
  return (
    
    <>
    <div className='d-flex flex-column align-items-center'>
      <h5>Passengers</h5>
    </div>
    <CountriesTables/>
    </>
    
  );
};

export default App;
