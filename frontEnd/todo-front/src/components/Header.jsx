import React from 'react'
import Todoicon from '../assets/icon.png';
import './Header.css';

export default function () {
  return (
    <div>
        <h2>
                To-Do List <img src={Todoicon} alt=""/>
        </h2>
    </div>
  )
}
