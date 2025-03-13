const removeActiveClass = () => {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
};
//Category buttons.

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // Loop operation on Array of object
  for (let category of categories) {
    // console.log(category);
    //create elements
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id="btn-${category.category_id}" onclick=" loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${category.category}</button>
    `;
    //append
    categoryContainer.appendChild(categoryDiv);
  }
}

//Video cards.
function loadVideos(searchText = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-all`);
      clickedButton.classList.add("active");
      displayVideos(data.videos);
    });
}
const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
      <img class="w-[120px]" src="assets/Icon.png" alt="">
      <h2 class="text-2xl font-bold ">Oops! Sorry, there is no content here!</h2>
    </div>
    `;
    return;
  }
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${
            video.thumbnail
          }" alt="Shoes" />
          <span class="absolute bottom-2 right-2 text-white bg bg-black rounded-sm px-2 text-sm">3hrs 56min ago</span>
        </figure>
        <div class="flex gap-3 py-5">
          <div class="profile pl-5">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="intro">
            <h3 class="text-xl">${video.title}</h3>
            <p class="text-sm text-gray-400 flex">${
              video.authors[0].profile_name
            }
            ${
              video.authors[0].verified == true
                ? '<img class="w-5 h-5 ml-1" src="assets/icons8-verified-badge-48.png" alt="">'
                : ""
            }
            </p>
            <p class="text-sm text-gray-500">${video.others.views} views</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${
          video.video_id
        }')"class="btn btn-block">Show Details</button>
      </div>
    `;
    videoContainer.append(videoCard);
  });
};

const loadCategoryVideos = (id) => {
  const url = `
  https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};
const loadVideoDetails = (videoId) => {
  // console.log(videoId);
  const url = `
  https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // removeActiveClass();
      // const clickedButton = document.getElementById(`btn-${id}`);
      // clickedButton.classList.add("active");
      // displayVideos(data.category);
      displayVideoDetails(data.video);
    });
};
const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>
  `;
};

document.getElementById('search-input').addEventListener("keyup", (e)=>{
  const input = e.target.value;
  // console.log(input);
  loadVideos(input);
})
//function call
loadCategories();
