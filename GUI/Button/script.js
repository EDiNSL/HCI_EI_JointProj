const toggleButton = document.getElementById('toggleButton');

let isOn = false;

const resetButton = document.getElementById('resetButton');

function resetFull(event){
  isOn = false;
  toggleButton.classList.toggle('on', isOn);
}

toggleButton.addEventListener('click', () => {
  isOn = !isOn;
  toggleButton.classList.toggle('on', isOn);
});

toggleButton.addEventListener('mousedown', () => {
    toggleButton.classList.add('pressed');
});

toggleButton.addEventListener('mouseup', ()=>{
    toggleButton.classList.remove('pressed');
})

resetButton.onclick = function(event){
  resetFull();
};


