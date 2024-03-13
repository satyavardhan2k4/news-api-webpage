const API_key="e8cf36fcfd27449cb032b42ded2429ec";//from news api website
const url="https://newsapi.org/v2/everything?q=";

function reload(){
    window.location.reload();
}
window.addEventListener('load',() => fetchNews("India"));//when we first open our website news related to india will be displayed

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_key}`);
    const data= await res.json();
    // console.log(data); check console section in inspect to see the data json object which contains articles related to india.
    bindData(data.articles);
}


function bindData(articles){
    const cardcontainer=document.getElementById("card-container");
    const newscardtemplate=document.getElementById("template-news-card");

    cardcontainer.innerHTML=""; //we declare this as empty so that when ever we bind the data we start with an empty card

    articles.forEach(articles=> {

        if(!articles.urlToImage) return; //if any articles dont have an image we wont consider it,urltoimage can be found in console of inspect.
        const cardclone=newscardtemplate.content.cloneNode(true);
        //above states that what ever is present in the id:-template-news-card should be made clonable even another div;
        fillDataInCard(cardclone,articles);
        cardcontainer.appendChild(cardclone);
        //(without fillDataInCard(cardclone,article);) this means that how many articles are there those many cloned nodes will be present and added to the main which has div of id:-card-container.

        
    });//(without fillDataInCard(cardclone,article);)  at this point you will get all cloned articles with no. exactly equal to the no. of articles with urltoimages
       //but with lorem text as further binding needs to be done. so we use fillDataInCard(cardclone,article);
}

function fillDataInCard(cardclone,articles){
    const newsImage=cardclone.querySelector('#news-img');
    const newsTitle=cardclone.querySelector('#news-title');
    const newsSource=cardclone.querySelector('#news-source');
    const newsDesc=cardclone.querySelector('#news-desc');


    //binding


    newsImage.src=articles.urlToImage;  //all these title,description,urltoimage are the keys provided in API which you have to check to bind the data
    newsTitle.innerHTML=articles.title;
    newsDesc.innerHTML=articles.description;
    



    const date=new Date(articles.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
        //publishedAt is an api element which contains date but in the API it is not in readable form 
        //u can check that by visiting their website its there in the home page only;
        //and we want date to be printed along with the source in the source section of our card;
        //toLocaleString("en-us",{
        //timeZone:"Asia/Jakarta"; this is google,new Date is js inbuilt to work with dates.

    });

    newsSource.innerHTML=`${articles.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(articles.url,"_blank");
    }
    );

}//proper binding done


let currentSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');



 searchButton.addEventListener("click",()=>{

    const query=searchText.value;
    if(!query) return;//if we hit search button without any input do nothing
    fetchNews(query);
    //if u selected a nav link like finance it becomes a active class
    //it becomes red,now if u search something then the nav link will still be red
    //indicating that finance is still the active class so we need to change that
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
});

function changetheme(){
    let element=document.body;
    if(element.className=="dark-mode"){
        element.className="light-mode";
    }
    else{
    element.className="dark-mode";
    }

}