/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = 500;
  canvasEl.height = 500;

  const context = canvasEl.getContext('2d');
});
