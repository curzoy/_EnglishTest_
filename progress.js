var body = document.querySelector('body'),
    bar = document.querySelector('.progress-bar'),
    counter = document.querySelector('.count'),
    i = 0,
    throttle = 1; // 0-1

(function draw() {
  if(i <= 100) {
    var r = Math.random();
    
    requestAnimationFrame(draw);  
    bar.style.width = i + '%';
    counter.innerHTML = Math.round(i) + '%';
    
    if(r < throttle) { // Simulate d/l speed and uneven bitrate
      i = (i*1.02) + r;
    }
  } else {;
    bar.className += " done";
    document.getElementById('content').style.display = "block";
  }
})();