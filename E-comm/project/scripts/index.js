

// Get references to the sort dropdowns
let sort = document.getElementById("sortData")

// Add event listener to sort dropdown
sort.addEventListener("change", function () {

   let sortValue = sort.value

     // Fetch data with the selected sort value
   // let url = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products'
   getData('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=1&limit=6', `&sort=price&order=${sortValue}`)
   // if (sortValue) {
   //     url += `?sort=price&order=${sortValue}`
   // }
   // getData(url)
})

// Get references to the  filter dropdowns
let filter = document.getElementById("filterData")

 // Add event listener to filter dropdown
filter.addEventListener("change", function () {
   let filterValue = filter.value

       // Fetch data with the selected filter value
   // let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products`
   getData('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=1&limit=6', `&filter=${filterValue}`)
   // if (filterValue) {
   //     url += `?filter=${filterValue}`
   // }
   // getData(url)
})

// Function to fetch data from the API

async function getData(url, queryparms = "") {
   try {

       let res = await fetch(`${url}${queryparms}`);

       let data = await res.json();
       console.log(data);

       let total_count = data.totalPages
       pagination(total_count, 6, queryparms)

       displayData(data.data);

   } catch (error) {
       console.log(error);
   }
}
 // Initial fetch of data
getData('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=1&limit=6');

let cont = document.getElementById("container");
let cartArr = JSON.parse(localStorage.getItem("cart-data")) || [];

function displayData(data) {
   cont.innerHTML = "";
   data.forEach((el, i) => {
       let card = document.createElement("div");

       let image = document.createElement("img");
       image.src = el.img;

       let category = document.createElement("p");
       category.textContent = `Category: ${el.category}`;

       let brand = document.createElement("p");
       brand.textContent = `Brand: ${el.brand}`;

       let details = document.createElement("p");
       details.textContent = `Details: ${el.details}`;

       let price = document.createElement("p");
       price.textContent = `Price: ${el.price}`;

       let cartBtn = document.createElement("button");
       cartBtn.textContent = "Add to Cart";
       cartBtn.addEventListener("click", function () {
           cartArr.push(el);
           alert("Added to cart");
           localStorage.setItem("cart-data", JSON.stringify(cartArr));
       });

       card.append(image, category, brand, details, price, cartBtn);
       cont.append(card);
   });
}

let pagin_card = document.getElementById("pagination")
 // Function to set up pagination
function pagination(total, limit, queryparms) {

   pagin_card.innerHTML = "";
   // let total_data = total;
   // let limitData = limit;

   // let noOfButtons = Math.ceil(total / limit)

   // console.log(noOfButtons)


   for (i = 1; i <= total; i++) {
       let btn = document.createElement("button")
       btn.textContent = i

       btn.addEventListener("click", (function (page) {
           return function () {
               getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?page=${page}&limit=6`, queryparms);
           }



       })(i))

       pagin_card.append(btn)
   }

}