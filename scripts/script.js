// Global variables
const landing = document.getElementById("landing");
const startingBtn = document.querySelector(".starter");
const monsterSect = document.querySelector(".cards");
const weaponSect = document.getElementById("weapons");

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
                    <img class="item-img" src="./assets/images/monster icons/${largeMonsters[i].name}.webp" alt="${largeMonsters[i].name}">
                    <p class="item-name">${largeMonsters[i].name}</p>
                </article></button>`
    }

    // Cards get printed
    monsterSect.innerHTML = list;

    // Store selection in LocalStorage
    const monsterCards = document.querySelectorAll(".card")

    for (let i = 0; i < monsterCards.length; i++) {
        monsterCards[i].addEventListener("click", async function () {
            
            console.log(`You chose the monster: ${largeMonsters[i].name}`)

            // Find weakness
            let monsterWeakness = largeMonsters[i].weaknesses.find(weak => weak.stars > 2)
            console.log(`Weakness: ${monsterWeakness.element}`)

            // Data gets stored
            localStorage.MonsterName = `${largeMonsters[i].name}`
            localStorage.MonsterWeakness = `${monsterWeakness.element}`

            //Hide the monster section
            setTimeout(makeMonstersDisappear, 2000);

            // Fetch weapon data
            let res = await fetch("https://mhw-db.com/weapons")
            let data = await res.json()

            // Find weapons with rarity6+
            let highRankWeapon = data.filter(weapon => weapon.rarity >= 6)

            // Filter by elemental weapons
            let elementalWeapons = highRankWeapon.filter(obj => obj.elements.length > 0)

            // Filter by monster weakness
            let weaknessWeapon = elementalWeapons.filter(obj => obj.elements[0].type == monsterWeakness.element)
            

            // Draw them on the DOM
            let weaponList = "<h3>Choose a weapon for your hunt:</h3>";
            let weaponsArr = [];
            for (let i = 0; i < weaknessWeapon.length; i++) {
                if (!weaponsArr.includes(weaknessWeapon[i].type)) {

                    weaponList += `<button><article class="card">
                                        <img class="item-img" src="./assets/images/weapon icons/${weaknessWeapon[i].type}.webp" alt="${weaknessWeapon[i].type}">
                                        <p class="item-name">${weaknessWeapon[i].type.replace("-", " ")}</p>
                                    </article></button>`
                    weaponsArr.push(weaknessWeapon[i].type)
                }
            }

            // Weapon section shows up
            weaponSect.style.display = null;
            weaponSect.style.display = "flex";
            weaponSect.innerHTML = weaponList; 
        }) 
    }
})

// Functions
function makeMonstersDisappear() { 
    console.log("Delayed action executed")
    monsterSect.style.display = null
}

