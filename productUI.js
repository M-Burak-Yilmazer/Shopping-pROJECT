export const showProduct = ({price,image,description,title,id})=>{
    document.querySelector("#products").innerHTML += `
     <div class=" col-lg-4 col-xl-6 ">
          <div class="card h-100">
            <img
              src="${image}"
              class="p-2"
              height="250px"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title line-clamp-1">${title}</h5>
              <p class="card-text line-clamp-3">${description}</p>
            </div>
            <div
              class="card-footer w-100 fw-bold d-flex justify-content-between gap-3"
            >
              <span>Price:</span><span>${price} $</span>
            </div>
            <div class="card-footer w-100 d-flex justify-content-center gap-3">
              <button class="btn btn-danger">Sepete Ekle</button>
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >See Details</button>
            </div>
          </div>
        </div>
    `;
}