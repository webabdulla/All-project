let allData = [];

const showAllData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data.data.tools;
      showSingleData(allData.slice(0, 6)); // slice 6 cards
    });
};

const showSingleData = (data) => {
  const cardContainer = document.getElementById("card-body");
  cardContainer.innerHTML='';

  data.forEach((singleData) => {
    const { features, image, name, published_in } = singleData;
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card h-100 p-3">
        <img src="${image}" class="card-img-top h-100 rounded" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">1.${features[0]}</p>
          <p class="card-text">2.${features[1]}</p>
          <p class="card-text">3.${features[2]}</p>
          <hr>
          <div class="d-flex display-fl justify-content-between">
            <div>
              <h4 class="fw-900">${name}</h4>
              <div class="d-flex gap-3">
                <p><i class="fa fa-calendar" aria-hidden="true"></i></p>
                <p>${published_in}</p>
              </div>
            </div>
            <div>
            <i onclick="showDetails('${singleData.id}')" class="fa fa-arrow-right border rounded-circle p-2 hover-effect" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  
};

showAllData();

const showAllButton = document.getElementById("show-all");
showAllButton.addEventListener("click", () => {
  showSingleData(allData); // show all items when button is clicked
});

const showAllButton1 = document.getElementById("show-all");
const loadersSection = document.getElementById("loaders");
showAllButton.addEventListener("click", () => {
  loadersSection.classList.remove("d-none"); // show the spinner
  const cardSection = document.getElementById("card-body");
  cardSection.classList.add("d-none"); // hide the card section
  setTimeout(() => {
    showSingleData(allData); // show all items when data is loaded
    loadersSection.classList.add("d-none"); // hide the spinner
    cardSection.classList.remove("d-none"); // show the card section
  }, 1000); // simulate 1 seconds delay to show the spinner
});

const showDetails = (id)=>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showModal(data.data))
}
const showModal = singleData => {
  const modalBody = document.getElementById("modal-body");
  const { input_output_examples, image_link, description, pricing, features, integrations, accuracy } = singleData;

  const accuracyScore = accuracy ? Math.round(accuracy.score * 100) : '';

  modalBody.innerHTML = `
    <div class="card h-100 w-100 p-3 col">
      <div class="position-relative">
        <img src="${image_link ? image_link[0] : "No image there"}" class="card-img-top accuracy rounded" alt="...">
        <div class="position-absolute top-0 end-0 ${accuracyScore ? 'bg-danger' : ''} text-white fw-600 p-2 rounded ml-5">
          ${accuracyScore ? accuracyScore + '% accuracy' : ''}
        </div>
      </div>
      <div class="card-body">
        <h5 id="null" class="card-title">${input_output_examples ? input_output_examples[0].input : 'can not find data'}</h5>
        <p class="card-text">${input_output_examples ? input_output_examples[0].output : 'can not find data'}</p>
      </div>
    </div>

    <div class="card h-100 w-100 p-3 col bg-danger-subtle">
      <div class="h-25 container">
        <p class=" fs-4 text">${description}</p>
      </div>

      <div class="container text-center mt-3 mb-3">
        <div class="row gap-2 ">
          <div class="col border border-dark bg-white p-2 ">
            <p class="text-success fw-bold ">${pricing ? pricing[0].price : 'free of cost/'}</p>
            <p class="text-success fw-bold ">${pricing ? pricing[0].plan : 'no data there'}</p>
          </div>

          <div class="col border border-dark bg-white p-2 ">
            <p class="text-warning fw-bold ">${pricing ? pricing[1].price : 'free of cost/'}</p>
            <p class="text-warning fw-bold ">${pricing ? pricing[1].plan : 'no data there'}</p>
          </div>

          <div class="col border border-dark bg-white p-2 ">
            <p class="text-danger fw-bold ">${pricing ? pricing[2].price : 'free of cost/'}</p>
            <p class="text-danger fw-bold ">${pricing ? pricing[2].plan : 'no data there'}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
};

    