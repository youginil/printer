import Printer from './src';

document.getElementById('print')?.addEventListener('click', () => {
  const p = new Printer({ preview: false });
  const boxes = document.querySelectorAll('.box');
  for (let i = 0; i < boxes.length; i++) {
    p.append(boxes[i]);
    if (i !== boxes.length - 1) {
      p.split();
    }
  }
  p.print();
});
