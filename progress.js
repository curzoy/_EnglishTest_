var body = document.querySelector('body'),
    html = document.querySelector('html'),
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
    setTimeout(function() {
      body.style.backgroundColor = "white";
      html.style.backgroundColor = "white";
      bar.style.display = "none";
      counter.style.display = "none";
      },200);
    
  }
})();
