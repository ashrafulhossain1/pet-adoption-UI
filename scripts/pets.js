
// fetch Categories button
const loadCategories = async () => {
    try {
        const uri = `https://openapi.programming-hero.com/api/peddy/categories`;
        const res = await fetch(uri);
        const data = await res.json();
        displayCategories(data.categories)
    }
    catch (error) {
        console.log("fetch error Catch:", error)
    }
}


// fetch category wise pets
const categoryWisePets = async (specificCategory) => {
    try {
        const uri = `https://openapi.programming-hero.com/api/peddy/category/${specificCategory}`;
        const res = await fetch(uri)
        const targetBtn = document.getElementById(`btn-${specificCategory}`);
        activeRemove(targetBtn)
        activeAdd(targetBtn)
        const data = await res.json();
        displayPets(data.data)
    }
    catch (error) {
        console.log("fetch Error Catch:", error)
    }
}



// fetch All pets
const loadPets = async () => {
    try {
        const uri = `https://openapi.programming-hero.com/api/peddy/pets`;
        const res = await fetch(uri);
        const data = await res.json();
        displayPets(data.pets)
    }
    catch (error) {
        console.log("fetch Error Catch:", error)
    }
}

// fetch single Pet  (Pet_Id)
const detailsModal = async (petId) => {
    try {
        const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
        const res = await fetch(uri);
        const data = await res.json();
        displayDetailsModal(data.petData)
    }
    catch (error) {
        console.log("fetch Error Catch:", error)
    }
}


// display all categories button
const displayCategories = (categoriesInfo) => {
    const categoriesContainer = document.getElementById("category-container");

    categoriesInfo.forEach((category) => {
        const cardContainer = document.createElement('div')
        cardContainer.innerHTML = `
        <div id="btn-${category.category}" onclick="categoryWisePets('${category.category}')" class="border border-blue-100 p-4 md:p-6 rounded-2xl flex gap-4 justify-center items-center h-18 md:h-20 lg:h-24 2xl:h-28 category-buttons">
        <img class="w-8 md:w-10 2xl:w-14 object-cover" src="${category.category_icon}">
            <p class="text-lg md:text-2xl font-bold">${category.category}</p>
        </div>
        `;
        categoriesContainer.append(cardContainer)
    });
};


// Display All Pets
const displayPets = (pets) => {
    const petCardsContainer = document.getElementById("pet-cards-container");
    document.getElementById("parentAll").classList.add('hidden')
    document.getElementById("spinner").classList.remove("hidden")
    petCardsContainer.innerHTML = "";

    setTimeout(() => {
        document.getElementById("parentAll").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")

        if (pets.length === 0) {
            petCardsContainer.classList.remove("grid")
            petCardsContainer.classList.add("bg-gray-100")
            petCardsContainer.innerHTML =
                `
            <div class="text text-center w-11/12 md:w-3/4 py-7 md:py-16 lg:py-40 mx-auto flex flex-col items-center justify-center">
                <img class="w-28 md:w-36 mx-auto" src="./images/error.webp">
                <h4 class="font-inter text-xl md:text-3xl font-bold text-gray-950 mt-4 md:mt-7 mb-2 md:mb-4">No Information Available</h4>
                <p class="font-lato text-base md:text-lg text-gray-700">It is a long established fact that a reader will be distracted by the readable content of a page when looking at  its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
            `;
            return
        }

        document.getElementById("pet-cards-container").classList.add("grid");
        petCardsContainer.classList.remove("bg-gray-100")

        pets.forEach((pet) => {
            const petCard = document.createElement("div");
            console.log(pet.image )
            petCard.classList = "card p-3 sm:p-2 md:p-3 lg:p-4 border border-gray-200 rounded-xl";
            petCard.innerHTML = `
        <figure class=" md:h-28 lg:h-40 2xl:h-[200px] w-full">
            <img class="rounded-lg h-full w-full object-cover "  src=${pet.image} alt="Shoes" />
        </figure>
        <div class="space-y-2 text-sm lg:text-base font-lato">
            <h1 class="text-xl font-bold text-gray-800 mt-4 md:text-2xl font-inter">${pet.pet_name}</h1>
            <div class="flex gap-2 text-gray-500 items-center justify-start">
                <i class="fa-solid fa-border-all"></i>
                <p class="overflow-hidden whitespace-nowrap text-ellipsis"}" ><span class="font-medium text-gray-500">Breed:</span> ${pet.breed ? pet.breed : "Not Available"}</p>
            </div>
            <div class="flex gap-2 text-gray-500 items-center justify-start">
                <i class="fa-regular fa-calendar"></i>
                <p><span class="font-medium text-gray-500">Birth:</span> ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</p>
            </div>
            <div class="flex gap-2 text-gray-500 items-center">
                <i class="fa-solid fa-mercury"></i>
                <p><span class="font-medium text-gray-500">Gender:</span> ${pet.gender ? pet.gender : "Not Available"}</p>
            </div>
            <div class="flex gap-2 text-gray-500 items-center justify-start">
                <i class="fa-solid fa-dollar-sign"></i>
                <p><span class="font-medium text-gray-500">Price:</span> ${pet.price ? pet.price : "Not Available"}</p>
            </div>
            <div class="divider py-4"></div> 
            <div class="flex justify-between gap-4 sm:gap-2 lg:gap-4">
                <button  onclick="displayActivity('${pet.image}')" class="btn w-2/12 xl:btn-md border-blue-100 font-bold text-teal-700"><i class="fa-regular fa-thumbs-up"></i></button>
                <button id="btn-${pet.petId}" onclick="adoptModal(${pet.petId})" class="btn w-4/12 xl:btn-md border-blue-100 font-bold text-teal-700 text-sm md:text-base">Adopt</button>
                <button onclick="detailsModal(${pet.petId})" class="btn w-4/12 xl:btn-md border-blue-100 font-bold text-teal-700 text-sm md:text-base">Details</button>
            </div>
        </div>
        `;
            petCardsContainer.append(petCard)
        })
    }, 1000);
}


// activity history pictures
const displayActivity = (activityImage) => {
    const activityContainer = document.getElementById("activity-container");
    const div = document.createElement("div");
    div.classList = "border-2 p-1 rounded-[9px] border-gray-200"
    div.innerHTML = `
    <img class="rounded-lg h-full w-full  object-cover" src="${activityImage}">
    `;
    activityContainer.appendChild(div);
}


// Details Modal
const displayDetailsModal = (uniquePet) => {
    console.log(uniquePet)

    const detailsModalContents = document.getElementById("details-modal-contents")
    detailsModalContents.innerHTML = `
    <div class ="border-b-2 pb-4">
        <img class="w-full rounded-xl" src="${uniquePet.image}"/>
        <h1 class="font-inter text-xl md:text-2xl font-bold text-gray-800 mt-4 mb-2">${uniquePet.pet_name}</h1>
        <div class ="grid grid-cols-2 text-sm md:text-lg">
            <div class="flex gap-2 text-gray-500 items-center">
                <i class="fa-solid fa-border-all"></i>
            <p>Breed: ${uniquePet.breed ? uniquePet.breed : "Not Available"}</p>
                </div>
            <div class="flex gap-2 text-gray-500 items-center">
                <i class="fa-regular fa-calendar"></i>
            <p>Birth: ${uniquePet.date_of_birth ? uniquePet.date_of_birth : "Not Available"}</p>
                </div>
            <div class="flex gap-2 text-gray-500 items-center">
                <i class="fa-solid fa-mercury"></i>
            <p>Gender: ${uniquePet.gender ? uniquePet.gender : "Not Available"}</p>
                </div>
            <div class="flex gap-2 text-gray-500 items-center">
                 <i class="fa-solid fa-dollar-sign"></i>
                    <p>Price: ${uniquePet.price ? uniquePet.price : "Not Available"}</p>
            </div>
             <div class="flex gap-2 text-gray-500 items-center">
            <i class="fa-solid fa-dollar-sign"></i>
            <p>Vaccinated: ${uniquePet.vaccinated_status ? uniquePet.vaccinated_status : "Not Available"}</p>
        </div>
        </div>
    </div>
    <div>
        <h2 class ="font-inter text-base md:text-xl font-bold my-2 md:mb-3">Details Information<h2>
        <p class="font-inter text-sm md:text-lg text-gray-700">${uniquePet.pet_details}</p>
    </div>
    `;
    document.getElementById("detailsModalShow").showModal()
}




// show modal adopt 
const adoptModal = (petId) => {
    const targetAdoptBtn = document.getElementById(`btn-${petId}`);
    const adoptModalShow = document.getElementById('adoptModalShow');
    const adoptContainer = document.getElementById("adopt-modal-contents");
    adoptContainer.innerHTML = `
    <img class="py-4 mx-auto" src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png">
        <h3 class="text-xl md:text-2xl lg:text-4xl font-extrabold">Congratulations</h3>
        <p class="text-base md:text-xl text-gray-600 my-2 md:my-4 font-bold">
            Adoption Process is Starting For your Pet
        </p>
        <div id="count" class="font-black text-2xl md:text-5xl mb-12">3</div>
    `;
    adoptModalShow.showModal();
    setTimeout(() => {
        targetAdoptBtn.setAttribute("disabled", true)
        targetAdoptBtn.innerText += "ed";
    }, 50)

    let countdown = 3;
    const interval = setInterval(() => {
        if (countdown > 0) {
            document.getElementById('count').innerText = countdown;
        }
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            adoptModalShow.close();
        }
    }, 1000);
};



// category btn remove and  active
const activeRemove = (targetBtn) => {
    const categoryButtons = document.getElementsByClassName("category-buttons")
    for (const btn of categoryButtons) {
        btn.classList.remove("bg-teal-50", "border-teal-500", "rounded-full")
    }
}
const activeAdd = (targetBtn) => {
    targetBtn.classList.add("bg-teal-50", "border-teal-500", "rounded-full")
}


// new fetch for sorting
const SortCategories = async () => {
    try {
        const uri = `https://openapi.programming-hero.com/api/peddy/pets`;
        const res = await fetch(uri);
        const data = await res.json();
        const shortedData = sortMachine(data.pets);
        displayPets(shortedData)
    }
    catch (error) {
        console.log("fetch error:", error)
    }
}

const sortMachine = (pets) => {
    return pets.sort((a, b) => {
        return b.price - a.price;
    })
}

// ---------------------------called-----------------------------
loadCategories();
loadPets();
