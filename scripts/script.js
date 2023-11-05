// Global variables

const landing = document.getElementById("landing");
const startingBtn = document.querySelector(".starter");
const monsterSect = document.getElementById("monster-cards");

// Events
startingBtn.addEventListener("click", async function() {

    // Landing screen hides
    landing.classList.add("hide"); 

    // Monster section shows up
    monsterSect.style.display = null;
    monsterSect.style.display = "flex"; 

    // Fetch data from API
    let res = await fetch("https://mhw-db.com/monsters")
    let data = await res.json()
    
    // Filter only large monsters
    let largeMonsters = data.filter(monster => monster.id > 16)
    
    // Print them on screen
    let list = "<h3>Choose a monster to hunt:</h3>"
    for (let i = 0; i < largeMonsters.length; i++) {
        list += `<button><article class="card">
                    <img class="monster-img" src="./assets/images/monster icons/${largeMonsters[i].name}.webp" alt="${largeMonsters[i].name}">
                    <p class="monster-name">${largeMonsters[i].name}</p>
                </article></button>`
        
    }

    monsterSect.innerHTML = list;
    
})

// Functions

