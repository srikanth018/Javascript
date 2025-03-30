
let page = 3;
let limit = 20;
let isFetching = false;


function fetchData(page){
   return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then(response => {return response.json()})
   
}

async function initialLoad(){
    const data = await fetchData(page)
    loadPage(data);
}

initialLoad();


function loadPage(data){
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    
    if(isFetching){
        const loading = document.createElement('p');
        loading.textContent = 'Loading..'
        loading.id = 'loading';
        main.appendChild(loading);
    }
    data.forEach(item => {
        const content = document.createElement('div');
        content.classList.add('img-container')
        
        const img = document.createElement('img');
        img.src = item.download_url;
        img.alt = item.author;


        const p = document.createElement('p');
        p.textContent = item.author;

        content.appendChild(img);
        content.appendChild(p);
        container.appendChild(content);
    });
    
    isFetching = false;
    if(!isFetching){
        document.getElementById("loading")?.remove();
    }
}

document.addEventListener('scroll', async ()=>{

    if((window.innerHeight+window.scrollY >= document.body.offsetHeight - 100) && !isFetching){
        isFetching = true;
        page++;
        const data = await fetchData(page);
        loadPage(data);
        console.log(data);
    }
    
})

