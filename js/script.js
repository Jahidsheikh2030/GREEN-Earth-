const listCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.categories)) {
            displayList(data.categories);
        }
    })
    
};

const displayList = (categories) => {
    const userList = document.getElementById("list-container");
    userList.innerHTML = "";
    const allLi = document.createElement('li');
    const allBtn = document.createElement('button');
    allBtn.textContent = "All Trees";
    allBtn.classList.add(
        "btn", "btn-block", "justify-start", "normal-case", "my-1", "text-left",
        "bg-green-700", "text-white", "hover:bg-green-800"
    );
    allLi.appendChild(allBtn);
    userList.appendChild(allLi);

    categories.forEach((item) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = item.category_name;
        btn.classList.add(
            "btn", "btn-block", "justify-start", "normal-case", "my-1", "text-left",
            "bg-transparent", "text-green-900", "hover:bg-green-100", "transition-colors", "duration-200"
        );
        li.appendChild(btn);
        userList.appendChild(li);
    });
};

listCategory();


const fetchAndDisplayPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.plants)) {
                displayPlantCards(data.plants);
            }
        })
        
};


let categoryDescriptions = {};

fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.categories)) {
            data.categories.forEach(category => {
                categoryDescriptions[category.category_name] = category.small_description;
            });
        }
    });

    // loadding spinner
    const showLoading = () => {
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = `
            <div class="flex justify-center items-center h-60 w-full">
                <span class="loading loading-spinner loading-lg text-green-700"></span>
            </div>
        `;
    };

let createCard = (tree) => {
    const card = document.createElement('div');
    card.classList.add(
        "w-60", "h-[350px]",
        "bg-white", "rounded-lg", "shadow-md", "p-2", "mb-2", "flex", "flex-col", "items-center"
    );
    
    const cardCount = document.querySelectorAll("#card-container > div").length;
    if (cardCount >= 6) {
        return null;
    }
    const img = document.createElement('img');
    img.src = tree.image ;
    img.alt = tree.name ;
    img.classList.add("w-60", "h-40", "object-cover", "rounded-md", "mb-2");

    const title = document.createElement('h3');
    title.textContent = tree.name ;
    title.classList.add("text-lg", "font-semibold", "mb-1", "cursor-pointer", "hover:underline", "text-green-700");
    title.addEventListener("click", (e) => {
        e.stopPropagation();
        showModal(tree);
    });

    const desc = document.createElement('p'); 
   
    desc.textContent = categoryDescriptions[tree.category] ;
    desc.classList.add("text-gray-600", "text-sm", "mb-2");

    const category = document.createElement('span');
    category.textContent = tree.category ;
    category.classList.add("bg-green-100", "text-green-700", "px-3", "py-1", "rounded-full", "text-xs", "mb-2");

    const price = document.createElement('span');
    price.textContent = `฿${tree.price }`;
    price.classList.add("font-bold", "ml-2");

    const priceRow = document.createElement('div');
    priceRow.classList.add("flex", "items-center", "justify-between", "w-full", "mb-2");
    priceRow.appendChild(category);
    priceRow.appendChild(price);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add(
        "bg-green-600", "hover:bg-green-700", "text-white", "font-semibold",
        "py-2", "px-6", "rounded-full", "w-full", "mt-2"
    );

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(priceRow);
    card.appendChild(addToCartBtn);

    return card;
};

const displayPlantCards = (plants) => {
    const cardContainer = document.getElementById("card-container");
    
    cardContainer.innerHTML = "";
    plants.forEach(plant => {
        const card = createCard(plant);
        if (card) {
            cardContainer.appendChild(card);
        }
    });
};




const setupCategoryFilter = () => {
    const userList = document.getElementById("list-container");
    let allPlants = [];

    
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data.plants)) {
                allPlants = data.plants;
            }
        });

    userList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
           
            const buttons = userList.querySelectorAll("button");
            buttons.forEach(btn => {
                btn.classList.remove("bg-green-700", "text-white", "hover:bg-green-800");
                btn.classList.add("bg-transparent", "text-green-900", "hover:bg-green-100");
            });

           
            e.target.classList.remove("bg-transparent", "text-green-900", "hover:bg-green-100");
            e.target.classList.add("bg-green-700", "text-white", "hover:bg-green-800");

            
            const selectedCategory = e.target.textContent;
            if (selectedCategory === "All Trees") {
                displayPlantCards(allPlants);
            } else {
                const filtered = allPlants.filter(plant => plant.category === selectedCategory);
                displayPlantCards(filtered);
            }
        }
    });
};



document.addEventListener("DOMContentLoaded", () => {
    setupCategoryFilter();
});



// const createCard = (tree) => {
//     const card = document.createElement('div');
//     card.classList.add(
//         "w-72", "h-[420px]",
//         "bg-white", "rounded-lg", "shadow-md", "p-2", "mb-2", "flex", "flex-col", "items-center"
//     );

//     const img = document.createElement('img');
//     img.src = tree.image ;
//     img.alt = tree.name ;
//     img.classList.add("w-60", "h-40", "object-cover", "rounded-md", "mb-2");

//     const title = document.createElement('h3');
//     title.textContent = tree.name ;
//     title.classList.add("text-lg", "font-semibold", "mb-1");

//     const desc = document.createElement('p'); 
//     desc.textContent = tree.description ;
//     desc.classList.add("text-gray-600", "text-sm", "mb-2");

//     const category = document.createElement('span');
//     category.textContent = tree.category ;
//     category.classList.add("bg-green-100", "text-green-700", "px-3", "py-1", "rounded-full", "text-xs", "mb-2");

//     const price = document.createElement('span');
//     price.textContent = `฿${tree.price }`;
//     price.classList.add("font-bold", "ml-2");

//     const priceRow = document.createElement('div');
//     priceRow.classList.add("flex", "items-center", "justify-between", "w-full", "mb-2");
//     priceRow.appendChild(category);
//     priceRow.appendChild(price);

//     const addToCartBtn = document.createElement('button');
//     addToCartBtn.textContent = "Add to Cart";
//     addToCartBtn.classList.add(
//         "bg-green-600", "hover:bg-green-700", "text-white", "font-semibold",
//         "py-2", "px-6", "rounded-full", "w-full", "mt-2"
//     );

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(desc);
//     card.appendChild(priceRow);
//     card.appendChild(addToCartBtn);

//     return card;
// };


document.addEventListener("DOMContentLoaded", fetchAndDisplayPlants);


const showModal = (tree) => {
    let modal = document.getElementById("tree-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "tree-modal";
        modal.className = "fixed inset-0 flex items-center justify-center z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg max-w-[300px] w-full p-6 relative">
                <button id="close-modal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                <img id="modal-img" class="w-full h-60 object-cover rounded mb-4" />
                <h2 id="modal-title" class="text-2xl font-bold mb-2"></h2>
                <span id="modal-category" class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mb-2 inline-block"></span>
                <p id="modal-desc" class="text-gray-700 my-2"></p>
                <p id="modal-price" class="font-bold text-lg mt-2"></p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.querySelector("#modal-img").src = tree.image;
    modal.querySelector("#modal-img").alt = tree.name;
    modal.querySelector("#modal-title").textContent = tree.name;
    modal.querySelector("#modal-category").textContent = tree.category;
    modal.querySelector("#modal-desc").textContent = tree.description ;
    modal.querySelector("#modal-price").textContent = `฿${tree.price}`;
    modal.style.display = "flex";

    modal.querySelector("#close-modal").onclick = () => {
        modal.style.display = "none";
    };
    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };
}



let cart = [];

const updateCartUI = () => {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((tree, idx) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center py-1 bg-green-50 rounded-lg mb-2 px-2";
        li.innerHTML = `
            <div>
                <span class="font-semibold">${tree.name}</span>
                <div class="text-gray-600 text-sm">৳${tree.price} × ${tree.quantity}</div>
            </div>
            <button class="remove-cart-item text-gray-400 hover:text-red-500 text-xl" data-idx="${idx}">&times;</button>
        `;
        cartList.appendChild(li);
        total += Number(tree.price) * tree.quantity;
    });
    cartTotal.textContent = `৳${total}`;
};

document.addEventListener("click", (e) => {
    if (e.target && e.target.textContent === "Add to Cart") {
       
        const card = e.target.closest("div");
        const name = card.querySelector("h3").textContent;
        const price = card.querySelector(".font-bold").textContent.replace(/[^\d.]/g, "");
        const img = card.querySelector("img").src;
        const category = card.querySelector("span.bg-green-100")?.textContent || "";
        const desc = card.querySelector("p.text-gray-600")?.textContent || "";

        
        const existing = cart.find(item => item.name === name && item.price === price);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, image: img, category, description: desc, quantity: 1 });
        }
        updateCartUI();
    }
    if (e.target && e.target.classList.contains("remove-cart-item")) {
        const idx = Number(e.target.getAttribute("data-idx"));
        cart.splice(idx, 1);
        updateCartUI();
    }
});





