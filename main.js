class PhotoGallery{
    constructor(){
      this.API_KEY = '563492ad6f91700001000001d1582d620f7c4877b5ffddde07c7691f';
      this.gallery = document.querySelector('.gallery');
      this.searchForm = document.querySelector('.header form');
      this.loadMore = document.querySelector('.load-more');
      this.logo = document.querySelector('.logo')
      this.pageIndex = 1;
      this.valueSearched= '';
      this.eventHandler();
    }

    //Method to  handle events of the Photo Gallery app
    eventHandler(){
      document.addEventListener('DOMContentLoaded',()=>{
        this.getImage(1);
      });
      this.searchForm.addEventListener('submit', (event)=>{
        this.pageIndex = 1;
        this.getSearchedImages(event);
      });
      this.loadMore.addEventListener('click', (event)=>{
        this.loadMoreImages(event);
      });
      this.logo.addEventListener('click',()=>{
        this.pageIndex = 1;
        this.gallery.innerHTML = '';
        this.getImage(this.pageIndex);
      });
    }
     //Async Method to fetch images API from Pexels site 
    async getImage(index){
      this.loadMore.setAttribute('data-img', 'curated');
      const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos);
      console.log(data);
    }
     
    // Method to implement Fetch API       
    async fetchImages(baseURL){
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {Accept: 'application/json', Authorization: this.API_KEY }
      });
      const data = await response.json();
      // console.log(data);
      return data;
    }
    //Method to generate HTML for the response fetched from Pexels API
    GenerateHTML(photos){
      photos.forEach(photo=>{
        const item= document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href='${photo.src.original}' target="_blank">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
        `;
        this.gallery.appendChild(item)
      });
    }
    //Method to generate HTMl and load images from Pexels API on searching in search tab
    async getSearchedImages(event){
      this.loadMore.setAttribute('data-img', 'search');
      event.preventDefault();
      this.gallery.innerHTML='';
      const searchValue = event.target.querySelector('input').value;
      this.valueSearched= searchValue;
      const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos);
      event.target.reset();
    }

    //Method to implement functionality of seearching more images in the app
    async getMoreSearchedImages(index){
      // console.log(searchValue)
      const baseURL = `https://api.pexels.com/v1/search?query=${this.valueSearched}&page=${index}&per_page=12`
      const data = await this.fetchImages(baseURL);
      console.log(data);
      this.GenerateHTML(data.photos);
    }

    //Method to load more images on tapping on LOAD MORE button
    loadMoreImages(event){
      let index = ++this.pageIndex;
      const loadMoreData = event.target.getAttribute('data-img');
      if(loadMoreData === 'curated'){
        // load next page for curated]
        this.getImage(index);
      }else{
        // load next page for search
        this.getMoreSearchedImages(index);
      }
    }
  }
  // // Class Instance for class Photo Gallery
  
  const gallery = new PhotoGallery;

  // class PhotoGallery{
//     constructor(){
//      this.API_key ='563492ad6f91700001000001d1582d620f7c4877b5ffddde07c7691f';
//      this.gallerydiv =document.querySelector('.gallery');
//      this.search =document.querySelector('.header form');
//      this.loadMore= document.querySelector('.load-more');
//      this.logo =document.querySelector('.logo');
//      this.pageIndex=1;
//      this.valueSearched='';
//      this.eventHandler();
//     }
    
//     //Method to  handle events of the Photo Gallery app
//     eventHandler(){
//         document.addEventListener('DOMContentLoaded' , () =>{
//             this.getImage(1);
//         });
//         this.search.addEventListener('submit' , (event) => {
//             this.pageIndex=1;
//             this.getSearchedImages(event);
//         });
//         this.loadMore.addEventListener('click' , (event) =>{
//             this.loadMoreImages(event);
//         });
//         this.logo.addEventListener('click' ,()=>{
//             this.pageIndex=1;
//             this.gallerydiv.innerHTML='';
//             this.getImage(this.pageIndex);
//         });
//       }

//      //Async Method to fetch images API from Pexels site 
//      async getImage(index){
//         this.loadMore.setAttribute('data-img','curated');
//           const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=15`;
//            const data = await this.fetchImages(baseURL);
//            this.generateHTML(data.photos);
//           console.log(data); 
//             }

//       // Method to implement Fetch API       
//      async fetchImages(baseURL){
//         const response = await fetch(baseURL ,{
//             method: 'GET',
//             headers:{ Accept: 'application/json', Authorization: this.API_key }
//         });
//         const data = await response.json();
//         return data;
//      }   
     
//     //Method to generate HTML for the response fetched from Pexels API
//      generateHTML(photos){
//          photos.forEach(photo => {
//              const item =document.createElement('div');
//              item.classList.add('item');
//              item.innerHTML = `
//              <a href= '${photo.src.original} target="_blank">
//              <img src="${photo.src.medium}">
//              </a>
//              <h3>${photo.Photographer}</h3> ` ;
//              this.gallerydiv.appendChild(item);
//          });
//      }
     
//     //Method to generate HTMl and load images from Pexels API on searching in search tab
//     async getSearchedImages(event){
//         this.loadMore.setAttribute('data-img','search');
//         event.preventDefault();
//         this.gallerydiv.innerHTML='';
//         const searchValue = event.target.querySelector('input').value ;
//         this.searchValue =this.valueSearched ;
//         const baseURL =  await `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=15` ;
//         const data = await this.fetchImages(baseURL) ;
//         this.generateHTML(data.photos);
//         event.target.reset();
//     }
    

//     //Method to implement functionality of seearching more images in the app

//     async getMoreSearchedImages(event){
//         const searchValue = this.search.querySelector('input').value ;
//         const baseURL =  await `https://api.pexels.com/v1/search?query=${this.valueSearched}&page=${index}&per_page=15` ;
//         const data = await this.fetchImages(baseURL) ;
//     }
    
//     //Method to load more images on tapping on LOAD MORE button
//     loadMoreImages(event){
//        let index= ++this.pageIndex;
//       const loadMoreData= event.target.getAttribute('data-img');
//       if(loadMoreData ==='curated'){
//         //   load page 2 for curated
//         this.getImage(index);

//       }else{
//         //load page 2 for search
//         this.getMoreSearchedImages(index);
//       }
//     }

// }




// // Class Instance for class Photo Gallery

// const gallery = new PhotoGallery