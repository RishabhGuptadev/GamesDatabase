const url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json" ; 
const searchInput = document.querySelector(".search-input");
const searchContainer = document.querySelector(".search-container");
const gameContainer = document.querySelector(".game-container");
const gameOptions = document.querySelector(".game-options");
const options = document.getElementById("games")

let arr =[];

//fetch api
const fetchGameFunction = async() =>{
    const response =  await fetch(url);
    let data = await response.json();
    let i=1;
    for (i=1;i<data.length;i++){
        arr.push(data[i]);
    }
   searchGameFunction(arr);
   p();
}

//search games using search bar
const searchGameFunction =(arr)=>{
    searchInput.addEventListener("change",function(e){
    const value = e.target.value;
    filterGames(value);
 })
}
//filter games based on search bar 
const filterGames =(value)=>{
    const searchedResult = arr.filter(data=>{
        return data.title.toLowerCase() === value.toLowerCase();
    });
    displayGames(searchedResult);
}


//display games 
const displayGames = (searchedResult) =>{
    const displayGames = searchedResult.map((result)=>{
        return `
        <div class="card">
        <div class="g-title">
             ${result.title} 
            </div>
            <div class="g-genre">
            ${result.genre}
            </div>
            <div class="g-platform">
            ${result.platform}
            </div>
        </div> 
            
        `
    }).join("");
    gameContainer.innerHTML = displayGames;
}

//search games by platform
const gamesbyPlatformName = ()=>{
    gameOptions.addEventListener("click",function(e){
        const platformValue = e.target.value;
        const getGameByPlatform = arr.filter((gamePlatform)=>{
                return gamePlatform.platform === platformValue
        });
        const displayGames = getGameByPlatform.map((game)=>{
            return `
            <div class="card">
            <div class="g-title">
                 ${game.title} 
                </div>
                <div class="g-genre">
                ${game.genre}
                </div>
                <div class="g-platform">
                ${game.platform}
                </div>
            </div> 
            `
        }).join("");
        gameContainer.innerHTML = displayGames;
    })
}

//dynamically create platform options
const p = ()=>{
    const platformOptions = arr.map((platform)=>{
        return platform.platform;
    });
    let unique = platformOptions.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log("this is the platform",unique)
    const displayPlatform  = unique.map((item)=>{
        return `
            <option value="${item}">${item}</option>
        `
    }).join("");
   options.innerHTML = displayPlatform;
}


gamesbyPlatformName()
fetchGameFunction();


