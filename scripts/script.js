// Global variables
    const landing = document.getElementById("landing");
    const startingBtn = document.querySelector(".starter");
    const monsterSect = document.querySelector(".cards");
    const weaponSect = document.getElementById("weapons");
    const comparatorSect = document.getElementById("comparator")


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

                // Store the weapon on LocalStorage
                const weaponCards = document.querySelectorAll("#weapons .card")
                for (let i = 0; i < weaponCards.length; i++) {
                    weaponCards[i].addEventListener("click", function() {
                        localStorage.weaponType = weaponsArr[i]
                        console.log(`You chose the weapon: ${weaponsArr[i]}`)

                        // Hide weapons screen
                        setTimeout(makeWeaponsDisappear, 2000);

                        // Show comparator screen
                        comparatorSect.style.display = null
                        comparatorSect.style.display = "flex"

                        // Draw the monster and weapon chosen
                        const monster = localStorage.getItem("MonsterName")
                        const weapon = localStorage.getItem("weaponType")
                        let comparatorList = `<h3>These are your choices:</h3>
                                                <article class="card">
                                                    <img class="item-img" src="./assets/images/monster icons/${monster}.webp" alt="${monster}">
                                                    <p class="item-name">${monster}</p>
                                                 </article>
                                                <article class="card">
                                                    <img class="item-img" src="./assets/images/weapon icons/${weapon}.webp" alt="${weapon}">
                                                    <p class="item-name">${weapon.replace("-", " ")}</p>
                                                </article>
                                                <h3>Your optimal weapon is...</h3>`
                        

                        // Find the optimal weapon
                        const optimalWeapons = weaknessWeapon.filter(obj => obj.type == weapon)
                        console.log(optimalWeapons)
                        console.log(optimalWeapons[0].assets.image)

                        comparatorList += `<article class="returned-card">
                                                    <img class="returned-item-img" src="${optimalWeapons[0].assets.image}" alt="${optimalWeapons[0].name}">
                                                    <p class="returned-item-name">${optimalWeapons[0].name}</p>
                                            </article>`
                        
                        comparatorSect.innerHTML = comparatorList;

                    })
                }
            }) 
        }
    })

    // Functions
    function makeMonstersDisappear() { 
        monsterSect.style.display = null
    }

    function makeWeaponsDisappear() {
        weaponSect.style.display = null
    }

