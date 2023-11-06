const monsterSect2 = document.getElementById("monsters-list")

async function generateMonsterList() {

    

    // Monster section shows up
    monsterSect2.style.display = null;
    monsterSect2.style.display = "flex"; 

    // Fetch data from API
    let res = await fetch("https://mhw-db.com/monsters")
    let data = await res.json()
    
    // Filter only large monsters
    let largeMonsters = data.filter(monster => monster.id > 16)
    
    // Print them on screen
    let list = "<h3>List of Monsters:</h3>"
    for (let i = 0; i < largeMonsters.length; i++) {
        list += `<button><article class="card">
                    <img class="item-img" src="../assets/images/monster icons/${largeMonsters[i].name}.webp" alt="${largeMonsters[i].name}">
                    <p class="item-name">${largeMonsters[i].name}</p>
                </article></button>`
    }

    // Cards get printed
    monsterSect2.innerHTML = list;
}

generateMonsterList();