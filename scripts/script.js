// Global variables
const startingBtn = document.querySelector(".starter");
const monsterSect = document.getElementById("monster-cards")

// Events
startingBtn.addEventListener("click", async function() {

    let res = await fetch("https://mhw-db.com/monsters")
    let data = await res.json()
    

    let largeMonsters = data.filter(monster => monster.id > 16)
    
    let list = ""
    for (let i = 0; i < largeMonsters.length; i++) {
        list += `<article class="card">
                    <img class="monster-img" src="./assets/images/monster icons/${largeMonsters[i].name}.webp" alt="${largeMonsters[i].name}">
                    <p class="monster-name">${largeMonsters[i].name}</p>
                </article>`
        
    }

    monsterSect.innerHTML = list;
    
})

// Functions

