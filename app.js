const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $currentAddOne = document.querySelector('#current-add-one');
const $boostButton = document.querySelector('#boost-button');
const $dropdown = document.getElementById("myDropdown");

let addOneValue = 1; // Default value for addOne

function Start() {
    setScore(getScore());
    updateAddOneDisplay();
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    setScore(getScore() + addOneValue);
}

function toggleDropdown() {
    $dropdown.classList.toggle("show");
}

$boostButton.addEventListener('click', () => {
    const currentScore = getScore();
    if (currentScore >= 1000) {
        setScore(currentScore - 1000); // Deduct 1000 coins
        addOneValue += 1; // Increase addOne value by 1
        updateAddOneDisplay();
        toggleDropdown(); // Close dropdown after action
    } else {
        alert("Not enough coins!");
    }
});

function updateAddOneDisplay() {
    $currentAddOne.textContent = `+${addOneValue}`;
}

$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const DEG = 30;
    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;
    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);
    setTimeout(() => {
        $circle.style.setProperty('--tiltX', 0);
        $circle.style.setProperty('--tiltY', 0);
    }, 300);
    
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${addOneValue}`;
    $circle.parentElement.appendChild(plusOne);
    addOne();
    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Prevent closing the dropdown when clicking on the background
window.onclick = function(event) {
    if (event.target.matches('.close-button')) {
        // Close the dropdown only if the close button is clicked
        toggleDropdown();
    }
}

Start();
