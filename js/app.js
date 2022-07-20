let currentPage = 1;
let totalPages = 0;

const loadData = async() => {

    let search = document.querySelector('#search').value;

    if (search === '') {
        showError('#msj-error', 'No puedes dejar campos vacios.');
        return;
    }

    const imgPerPage = 20;

    const API_KEY = '20256978-9736c042fb5b97bd4259a36b6';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${search}&per_page=${imgPerPage}&page=${currentPage}`;

    const response = await fetch(URL);
    const result = await response.json();

    let imagesArray = result.hits;

    console.log(response);

    let showImages = ``;

    imagesArray.map(img => {

        const{largeImageURL, likes, user, user_id, tags, views, userImageURL, downloads} = img;

        showImages+=`
        <div class="card align-self-start m-4 border-0" style="width: 16rem;">
            <div class="card-header border-0">
                <div class="d-flex align-items-center gap-3 h-100">
                    <img class="img-fluid rounded-circle" src="${userImageURL}" alt="${user}" width="34">
                    <a target="_blank" rel="noopener noreferrer" href="https://pixabay.com/users/${user}-${user_id}/" class="fw-bold m-0 link-dark text-decoration-none">${user}</a>
                </div>
            </div>
            <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer" class="text-decoration-none my-3">
                <img loading="lazy" src="${largeImageURL}" class="card-img-top" alt="${tags}">
            </a>
                
            <div class="card-body">
                <div class="d-flex flex-wrap gap-3">
                <div class="text-normal">
                    <p class="text-danger m-0 fw-light fs-sm-title fw-normal">Likes</p>
                    <p class="text-danger fs-sm fw-light"><i class="bi bi-heart-fill"></i> ${likes}</p>
                </div>
                <div class="text-normal">
                    <p class="m-0 fw-light fs-sm-title fw-normal">Views</p>
                    <p class="fs-sm fw-light"><i class="bi bi-eye-fill"></i> ${views}</p>
                </div>
                <div class="text-normal">
                    <p class="m-0 fw-light fs-sm-title fw-normal">Downloads</p>
                    <p class="fs-sm fw-light"><i class="bi bi-cloud-arrow-down-fill"></i> ${downloads}</p>
                </div>
                </div>
            </div>
        </div>`

    });

    if (imagesArray.length === 0) {
        showImages = `<div class="card text-center m-4 border-0 m-auto card-none">
        <div class="card-body">
            <img src="img/Easter bunny_Monochromatic.png" class="img-fluid" alt="Easter bunny Monochromatic" width="300">
            <h1 class="text-muted">Nothing found</h1>
            <p class"fw-light h4">Try searching again</p>
        </div>
    </div>`;
    }

    let welcomeImg = document.querySelector('#welcome-img');

    welcomeImg.style.display = 'none';

    let showMain = document.querySelector('#main');

    showMain.style.display = 'block';

    let showTextResult = document.querySelector('#result-text');

    showTextResult.innerHTML = `Results of <span class="text-muted fw-light fst-italic">${search}</span>`

    let showData = document.querySelector('#data');

    showData.innerHTML = showImages;

    totalPages = Math.ceil(result.totalHits/imgPerPage);

    let pagination = document.querySelector('#pagination');

    if(imagesArray.length === 0) {
        pagination.style.display = 'none';
    } else {
        pagination.style.display = 'block';
    }

    let backPage = (currentPage === 1) ? ``:`<button type="button" class="btn btn-sm bg-green rounded-pill fw-bold" onClick="backPage()"><i class="bi bi-caret-left-fill"></i> Back</button>`;

    let nextPage = (currentPage === totalPages) ? ``:`<button type="button" class="btn btn-sm bg-green rounded-pill fw-bold" onClick="nextPage()">Next <i class="bi bi-caret-right-fill"></i></button>`;

    pagination.innerHTML = `${backPage} ${nextPage}`;

    const searchHeader = document.querySelector('.search-header');
    searchHeader.scrollIntoView({behavior:'smooth'});

}

const backPage = () => {
    currentPage--;
    if(currentPage === 0){
        return;
    } else {
        loadData();
    }
}

const nextPage = () => {
    currentPage++;
    if (currentPage>totalPages) {
        return;
    } else {
        loadData();
    }
}

const showError = (e,msj) => {
    errorDiv = document.querySelector(e);
    errorDiv.innerHTML = `<p class="text-danger fs-sm">${msj}</p>`;
    setTimeout(()=>{errorDiv.innerHTML=``}, 2000);
}