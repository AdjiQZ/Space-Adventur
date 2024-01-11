var isMoving = true;
var isGameStarted = false;
var backgroundMoveTimeout;

function setBackgroundMoving() {
  if (isMoving && isGameStarted) {
    // if (isMoving == true) {
    backgroundMoveTimeout = setTimeout(function () {
      //setting background berjalan
      var bg = document.getElementById("main");
      bg.style.backgroundPositionY = parseInt(bg.style.backgroundPositionY.replace("px", "")) + 1 + "px";

      //update Score
      document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 1;

      clearTimeout(backgroundMoveTimeout);
      backgroundMoveTimeout = null;

      //memanggil recursive setbackgroundmoving
      setBackgroundMoving();
    });
  }
}
//inisialisasi background berjalanya
setBackgroundMoving();

//setting meteor

function setMeteorMoving() {
  if (isGameStarted) {
    var meteor = document.getElementById("meteor"),
      plane = document.getElementById("plane");

    function move() {
      meteor.style.marginTop = parseInt(meteor.style.marginTop.replace("px", "")) + 6 + "px"; // Ganti nilai 5 dengan kecepatan yang diinginkan

      if (parseInt(meteor.style.marginTop.replace("px", "")) > 500) {
        meteor.style.marginLeft = Math.floor(Math.random() * 260) + 10 + "px";
        meteor.style.marginTop = "-100px";
      }

      if (meteor.offsetTop + 56 >= plane.offsetTop && meteor.offsetLeft + 50 >= plane.offsetLeft && meteor.offsetTop + 56 <= plane.offsetTop + 100 && meteor.offsetLeft <= plane.offsetLeft + 50) {
        var gameOverAudio = document.getElementById("gameOverAudio");
        gameOverAudio.play();
        backgroundAudio.pause();
        alert("GAME OVER, Score : " + document.getElementById("score").innerHTML);
        // Mengatur ulang skor ke nol
        document.getElementById("score").innerHTML = 0;
        var continueGame = confirm("Apakah Anda Ingin Melanjutkan Permainan");
        if (continueGame) {
          backgroundAudio.play();
          meteor.style.marginLeft = Math.floor(Math.random() * 550) + "px";
          meteor.style.marginTop = "-100px";
          //gerakan lagi meteornya
          requestAnimationFrame(move);
        }
      } else {
        requestAnimationFrame(move);
      }
    }
  }
  // Memulai animasi
  document.getElementById("startButton").addEventListener("click", startGame);
  requestAnimationFrame(move);
}

// Inisialisasi
setMeteorMoving();

function startGame() {
  isGameStarted = true;
  setBackgroundMoving();
  setMeteorMoving();
  //Control arah
  window.addEventListener("keydown", function (e) {
    var plane = document.getElementById("plane"),
      left = parseInt(plane.style.marginLeft.replace("px", "")),
      top = parseInt(plane.style.marginTop.replace("px", ""));
    /*
      atas = 38
      bawah = 40
      kanan = 39
      kiri = 37
    */
    if (isMoving == true) {
      if (e.keyCode == 37) {
        if (left > 0) {
          plane.style.marginLeft = left - 10 + "px";
        }
      } else if (e.keyCode == 38) {
        if (top > 0) {
          plane.style.marginTop = top - 10 + "px";
        }
      } else if (e.keyCode == 39) {
        if (left < 310) {
          plane.style.marginLeft = left + 10 + "px";
        }
      } else if (e.keyCode == 40) {
        if (top < 400) {
          plane.style.marginTop = top + 10 + "px";
        }
      }
    }
  });
}
// ... (Kode JavaScript yang sudah ada)

function movePlane(direction) {
  var plane = document.getElementById("plane"),
    left = parseInt(plane.style.marginLeft.replace("px", "")),
    top = parseInt(plane.style.marginTop.replace("px", ""));

  switch (direction) {
    case "up":
      if (top > 0) {
        plane.style.marginTop = top - 10 + "px";
      }
      break;
    case "down":
      if (top < 400) {
        plane.style.marginTop = top + 10 + "px";
      }
      break;
    case "left":
      if (left > 0) {
        plane.style.marginLeft = left - 10 + "px";
      }
      break;
    case "right":
      if (left < 310) {
        plane.style.marginLeft = left + 10 + "px";
      }
      break;
  }
}

// ... (Kode JavaScript yang sudah ada)
