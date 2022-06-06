import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from './Container.jsx';
import ChartRenderer from './classes/ChartRenderer.js';
import OverlayRenderer from './classes/OverlayRenderer.js';

const overlayRenderer = new OverlayRenderer();
const chartRenderer = new ChartRenderer(10, '#151924');

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container overlayRenderer={overlayRenderer} chartRenderer={chartRenderer}/>
)
