    // Timer variables
    let time = 1500; // 25 minutes in seconds
    let timerInterval;
    let isPaused = true;

    // Display initial time
    updateTimer();

    // Function to start the timer based on the type (pomodoro, shortBreak, longBreak)
    function startTimer(type) {
    if (isPaused) {
        isPaused = false;
        switch (type) {
        case 'pomodoro':
            time = 1500; // 25 minutes in seconds
            break;
        case 'shortBreak':
            time = 300; // 5 minutes in seconds
            break;
        case 'longBreak':
            time = 900; // 15 minutes in seconds
            break;
        }
        timerInterval = setInterval(updateTimer, 1000);
    }
    }

    // Function to pause the timer
    function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    }

    // Function to reset the timer
    function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
      time = 1500; // Reset time to 25 minutes
    updateTimer();
    }

    // Function to update the timer display
    function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timerDisplay = document.querySelector('.timer');
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        alert('Time is up!');
    }
    }

    // Add item to the todo list
    function addItem() {
        const todoInput = document.getElementById('todo-input');
        const todoList = document.getElementById('todo-list');

        if (todoInput.value === '') {
          return; // Ignore empty input
        }

        const itemText = todoInput.value;
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
        <span onclick="crossOut(this)">${itemText}</span>
        <button onclick="deleteItem(this)">Delete</button>
        `;

        todoList.appendChild(listItem);
        todoInput.value = '';
    }

      // Cross out the item
    function crossOut(item) {
        item.classList.toggle('crossed');
    }

      // Delete the item
    function deleteItem(item) {
        const listItem = item.parentNode;
        listItem.remove();
    }

    function getCurrentTime() {
        const date = new Date()
        document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    }
    
    setInterval(getCurrentTime, 1000)

// Weather Api
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});