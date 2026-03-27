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

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if(page === 1){
            searchResult.innerHTML = "";
        }

        if(results.length === 0 && page === 1){
            noResults.style.display = "block";
            return;
        }

        results.forEach((result)=>{
            const image=document.createElement("img");
            image.src=result.urls.small;
            image.alt=result.alt_description || "Image";

            const imageLink=document.createElement("a");
            imageLink.href=result.links.html;
            imageLink.target="_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

          if(results.length > 0){
            searchMoreBtn.style.display="block";
        }

    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
    }
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
});

searchMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
});