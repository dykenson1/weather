//  Creation du Dom pour afficher les contenus de l'App
const content = document.createElement('div');
content.setAttribute("id", "app");
const  body = document.querySelector('body');
const divSearch = document.createElement('div');
const divInfo = document.createElement('div');
divInfo.setAttribute("class","info")
const input = document.createElement('input');
const btn = document.createElement('button');
const h1 = document.createElement('h1');
const h2= document.createElement('h2');
const para = document.createElement('p');
const divImg = document.createElement('div')
divImg.setAttribute("class", "img-container")
const img = document.createElement('img');
 

function getApi(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=5b286f0badd14513a2f141030241902&q=Haiti`)
    .then(response => response.json())
    .then(data => {
        img.src = data.current.condition.icon;
        h2.textContent = `${data.location.name}`
        para.innerHTML=`Temperature : ${data.current.temp_c} C° / ${data.current.temp_f} F° `
        
    })
}
btn.textContent = 'Search'
h1.textContent = 'Weather'


getApi()


// asyncrone
async function getWeather(city){
    const  response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5b286f0badd14513a2f141030241902&q=${city}`);
    const json = await response.json();
    img.src = json.current.condition.icon
    h2.textContent = `${json.location.name}`
    para.innerHTML=`Temperature : ${json.current.temp_c} C° / ${json.current.temp_f} F° `
    if(json.current.condition.is_day === true){
        console.log('night')
        content.style.backgroundColor = 'black'
    }
    console.log(json);
}

// evenement
btn.addEventListener('click',()=>{
    let cityName = input.value;
     if (cityName === '') {
         alert('Please enter a city name!')
     } else {
         // Requête API Open Weather Map
         getWeather(cityName)
     }
})




// Ajout au DOM
divSearch.appendChild(input);
input.setAttribute("type","text")
input.className="search"
divSearch.appendChild(btn)
divImg.appendChild(img)
divInfo.appendChild(divImg)
divInfo.appendChild(h2)
divInfo.appendChild(para)
content.appendChild(h1)
content.appendChild(divSearch);
content.appendChild(divInfo)
body.appendChild(content)

