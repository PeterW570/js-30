/* global document, window */

class CssGridUtil {
  
  constructor(keys, brkPt) {
    this.keys = keys;
    this.breakpoint = brkPt;
    this.isLarge = window.innerWidth > brkPt ? true : false;
    this.setKeyGridVals();
  }
  
  setGridOnResize() {
    if (window.innerWidth > this.breakpoint) {
      if (!this.isLarge) {
        this.isLarge = true;
        this.setKeyGridVals();
      }
    } else {
      if (this.isLarge) {
        this.isLarge = false;
        this.setKeyGridVals();
      }
    }

  }

  setKeyGridVals() {
    this.keys.forEach((key,idx) => key.style["grid-column"] = this.indexForGridCol(idx));
    
    this.keys.forEach((key,idx) => key.style["grid-row"] = this.indexForGridRow(idx));
  }

  indexForGridCol(idx) {
    if (this.isLarge) {
      return idx + 1;
    } else {
      return (idx + 3) % 3 + 2;
    }
  }
  
  indexForGridRow(idx) {
    if (this.isLarge) {
      return 1;
    } else {
      return Math.ceil((idx + 1)/3) + 1;
    }
  }
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  
  if(!audio) return; // stop the function from running
  
  audio.currentTime = 0; // rewind to the start to allow audio to play before the previous audio has finished
  
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if(e.propertyName !== "transform") return; // skip if not transform
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
let gridUtil = new CssGridUtil(keys, 950);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('resize', gridUtil.setGridOnResize.bind(gridUtil));