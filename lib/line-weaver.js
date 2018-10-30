/**
 * Application entry point
 */

// Load application styles
// import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('webpack is working');

  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = 500;
  canvasEl.height = 500;

  const context = canvasEl.getContext('2d');
});
