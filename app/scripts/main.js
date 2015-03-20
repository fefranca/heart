(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var canvas = querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var lastPoints;
  var center = {x: 0, y: 0};

  function draw(heartSize) {
    var dotRadius = heartSize / 50;
    var x, y;
    var points = [];

    for (var i = 0; i <= 200; i++) {
      var t = (i / 200) * 2 * Math.PI;
      x = 4 * Math.pow(Math.sin(t), 3);
      y =  3 * Math.cos(t) - 1.3 * Math.cos(2*t) - 0.6 * Math.cos(3*t) - 0.2 * Math.cos(4*t);
      y += 0.5; // correct distance between inner / outer hearts

      x = center.x + x * heartSize;
      y = center.y - y * heartSize;

      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, 2 * Math.PI, true);
      ctx.fill();

      points.push({x: x, y: y});
      if(lastPoints) {
        var p2 = lastPoints[(Math.floor(heartSize / 50) + i+1) % 201];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    lastPoints = points;

  }

  function redraw() {

    lastPoints = false;

    center.x = (0.2 + Math.random() * 0.6) * canvas.width;
    center.y = (0.2 + Math.random() * 0.6) * canvas.height;

    // Change color before next draw
    ctx.fillStyle = '#' + Math.floor(Math.random() * 0x808080 + 0x808080).toString(16);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';


    for (var i = 0; i < 6; i++) {
      draw(10 + i * Math.random() * 20);
    }
    draw(1000);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
  }

  function onTap(e) {
    e.preventDefault();
    redraw();
  }

  window.addEventListener('resize', resize, false);
  canvas.addEventListener('mouseup', onTap, false);
  canvas.addEventListener('touchend', onTap, false);

  // Initial draw
  resize();

})();
