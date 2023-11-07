    
    // Global variables
    const landing = document.getElementById("landing");
    const startingBtn = document.querySelector(".starter");
    const monsterSect = document.querySelector(".cards");
    const weaponSect = document.getElementById("weapons");
    const comparatorSect = document.getElementById("comparator")
    const homeBtn = document.querySelector("#nav-ul > li:nth-child(2)")
    const monsterListBtn = document.querySelector("#nav-ul > li:nth-child(3)")
    const spinner = document.querySelector(".loading-spinner")

    // Starting event
    
    startingBtn.addEventListener("click", async function() {

        // Landing screen hides
        landing.classList.add("hide");
        
        // Spinner shows up
        spinner.style.display = "flex";

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

        // Spinner hides
        spinner.style.display = "none";

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

                // Spinner shows up
                spinner.style.display = "flex";

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
                
                // Spinner hides
                spinner.style.display = "none";
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
                        // Filter by selected weapon type
                        const optimalWeapons = weaknessWeapon.filter(obj => obj.type == weapon)
                        
                        // Iterate to store the attack value
                        let attackValues = [];
                        for (let i = 0; i < optimalWeapons.length; i++) {

                            attackValues.push(optimalWeapons[i].attack.display)
                        }

                        let attackHightoLow = attackValues.sort((a,b) => b-a);
                        let highestAttack = attackHightoLow[0]

                        // Find the weapon in the array matching the highest attack
                        let optimalWeapon = optimalWeapons.find(obj => obj.attack.display == highestAttack)
                        
                        comparatorList += ` <div class="flip-card">
                                                <div class="flip-card-inner">
                                                    <div class="flip-card-front" class="returned-card">
                                                        <img src="${optimalWeapon.assets.image}" alt="${optimalWeapon.name}" class="returned-img">
                                                        <p class="returned-item-name">${optimalWeapon.name}</p>
                                                    </div>
                                                    <div class="flip-card-back">
                                                        <p>Attack: ${optimalWeapon.attack.display}</p>
                                                        <p>Element: ${optimalWeapon.elements[0].type.charAt(0).toUpperCase() + optimalWeapon.elements[0].type.slice(1)}</p>
                                                        <p>Elemental DMG: ${optimalWeapon.elements[0].damage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="finisher">Return home</button>`
                                            
                        
                        comparatorSect.innerHTML = comparatorList;
                        document.querySelector(".finisher").addEventListener("click", returnHome)
                    })
                }
            }) 
        }
    })
    
    homeBtn.addEventListener("click", returnHome)

    // Functions
    function makeMonstersDisappear() { 
        monsterSect.style.display = null
    }

    function makeWeaponsDisappear() {
        weaponSect.style.display = null
    }

    function returnHome() {
        monsterSect.style.display = null;
        weaponSect.style.display = null;
        comparatorSect.style.display = null;
        monsterSect.innerHTML = "";
        weaponSect.innerHTML = "";
        comparatorSect.innerHTML = ""; 
        landing.classList.remove("hide");
    }


