const accessKey="HL0Hhz9ucoty-V4JQ32jB6RlCFL4vaQ3T-W8W7X3Imc";
const searchForm=document.getElementById("search-form");
const searchBox=document.getElementById("search-box");
const searchResult=document.getElementById("search-result");
const searchMoreBtn=document.getElementById("show-more-btn");
const loader = document.getElementById("loader");
const noResults = document.getElementById("no-results");

let keyword="";
let page=1;

async function searchImages(){
    keyword = searchBox.value.trim();
    if(keyword === "") return;

    loader.style.display = "block";
    noResults.style.display = "none";
    searchMoreBtn.style.display = "none";

    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
