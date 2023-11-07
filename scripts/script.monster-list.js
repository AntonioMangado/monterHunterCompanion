    
    // Variables globales
    const monsterSect2 = document.getElementById("monsters-list")
    const spinner = document.querySelector(".loading-spinner")

    // Funciones
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
        let list = `<article class="filter">
                        <h3>Filter monsters by:</h3>
                        <button class="filter-alph">A - Z</button>
                        <button class="filter-weak">Species</button>
                    </article>`
        for (let i = 0; i < largeMonsters.length; i++) {
            list += `<button><article class="card">
                        <img class="item-img" src="../assets/images/monster icons/${largeMonsters[i].name}.webp" alt="${largeMonsters[i].name}">
                        <p class="item-name">${largeMonsters[i].name}</p>
                    </article></button>`
        }

        // Cards get printed
        spinner.style.display = "none";
        monsterSect2.innerHTML = list;

        // Event listener para filtrar
        document.querySelector(".filter-alph").addEventListener("click", generateMonstersAZ)
        document.querySelector(".filter-weak").addEventListener("click", generateMonstersBySpecies)
    }

    generateMonsterList();

    async function generateMonstersAZ() {

        monsterSect2.innerHTML = ""
        spinner.style.display = "flex";

        // Fetch data from API
        let res = await fetch("https://mhw-db.com/monsters")
        let data = await res.json()
        
        // Filter only large monsters
        let largeMonsters = data.filter(monster => monster.id > 16)

        // sort by name
        const sortedMonstersZA = largeMonsters.sort(function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            // names must be equal
            return 0;
            });

        const sortedMonsters = sortedMonstersZA.reverse()
        
        // Print them on screen
        let list = `<article class="filter">
                        <h3>Filter monsters by:</h3>
                        <button class="filter-alph">A - Z</button>
                        <button class="filter-weak">Species</button>
                    </article>`;
        for (let i = 0; i < sortedMonsters.length; i++) {
            list += `<button><article class="card">
                        <img class="item-img" src="../assets/images/monster icons/${sortedMonsters[i].name}.webp" alt="${sortedMonsters[i].name}">
                        <p class="item-name">${sortedMonsters[i].name}</p>
                    </article></button>`
        }

        spinner.style.display = "none";
        monsterSect2.innerHTML = list
        document.querySelector(".filter-weak").addEventListener("click", generateMonstersBySpecies)
    }

    async function generateMonstersBySpecies () {
        monsterSect2.innerHTML = ""
        spinner.style.display = "flex";

        // Fetch data from API
        let res = await fetch("https://mhw-db.com/monsters")
        let data = await res.json()
        
        // Filter only large monsters
        let largeMonsters = data.filter(monster => monster.id > 16)

        // Finding all unique species
        let uniqueSpecies = [];

        for (let i = 0; i < largeMonsters.length; i++) {
            if (!uniqueSpecies.includes(largeMonsters[i].species)) {
                uniqueSpecies.push(largeMonsters[i].species)
        }}

        // Finding all monsters sorted by species
        const fangedWyverns = largeMonsters.filter(obj => obj.species == "fanged wyvern")
        const birdWyverns = largeMonsters.filter(obj => obj.species == "bird wyvern")
        const bruteWyverns = largeMonsters.filter(obj => obj.species == "brute wyvern")
        const piscineWyverns = largeMonsters.filter(obj => obj.species == "piscine wyvern")
        const flyingWyverns = largeMonsters.filter(obj => obj.species == "flying wyvern")
        const elderDragons = largeMonsters.filter(obj => obj.species == "elder dragon")
        const relicts = largeMonsters.filter(obj => obj.species == "relict")
        const fangedBeasts = largeMonsters.filter(obj => obj.species == "fanged beast")
        
        const speciesArr = [fangedWyverns, birdWyverns, bruteWyverns, piscineWyverns, flyingWyverns, elderDragons, relicts, fangedBeasts]
        //Priting them on screen
        let list = `<article class="filter">
                        <h3>Filter monsters by:</h3>
                        <button class="filter-alph">A - Z</button>
                        <button class="filter-weak">Species</button>
                     </article>`;

        for (let i = 0; i < speciesArr.length; i++) {
            list += `<h3>${speciesArr[i][0].species.toUpperCase()}</h3>`
            for (let j = 0; j < speciesArr[i].length; j++) {
                list += `<button><article class="card">
                            <img class="item-img" src="../assets/images/monster icons/${speciesArr[i][j].name}.webp" alt="${speciesArr[i][j].name}">
                            <p class="item-name">${speciesArr[i][j].name}</p>
                        </article></button>`
            }
        }

        spinner.style.display = "none";
        monsterSect2.innerHTML = list;
        document.querySelector(".filter-alph").addEventListener("click", generateMonstersAZ)
    }

    //Events
