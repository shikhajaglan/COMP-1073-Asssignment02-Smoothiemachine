//Shikha Shikha
//Date = 2025-07-16
// Smoothie class to model a smoothie order
class Smoothie {
  constructor(size, ingredients, base, protein) {
    this.size = size;
    this.ingredients = ingredients;
    this.base = base;
    this.protein = protein;
    this.price = this.calculatePrice(); //This will automatically calculate the price
  }

  // It helps to calculate total price based on the customers choice 
  calculatePrice() {
    let price = 0;

    // Price is different for different size
    if (this.size === "Small") price += 6;
    else if (this.size === "Medium") price += 8;
    else if (this.size === "Large") price += 10;

    // Ingredients cost ($0.50 per ingredient)
    price += this.ingredients.length * 0.5;

    //  protein cost for those who wants to add that
    if (this.protein) price += 1.5;

    return price.toFixed(2); 
  }

  // Return a readable description of the smoothie
  getDescription() {
    return `
      <h2>Your Smoothie</h2>
      <p><strong>Size:</strong> ${this.size}</p>
      <p><strong>Ingredients:</strong> ${this.ingredients.join(', ')}</p>
      <p><strong>Base:</strong> ${this.base}</p>
      <p><strong>Protein:</strong> ${this.protein ? "Yes" : "No"}</p>
      <p><strong>Total Price:</strong> $${this.price}</p>
    `;
  }
}

// Form submission handler
document.getElementById("smoothieForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // option for selecting smoothie size
  const size = document.getElementById("size").value;

  //option for  selecting the base for smoothie
  const base = document.getElementById("base").value;

  // After that, Check if protein is selected
  const protein = document.getElementById("protein").checked;

  // Get all selected ingredient
  const ingredients = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(input => input.value);

  if (ingredients.length > 4) {
    alert("Please select up to 4 ingredients.");
    return;
  }

  // Create a Smoothie object
  const smoothie = new Smoothie(size, ingredients, base, protein);

  // Showing smoothie description
  document.getElementById("output").innerHTML = smoothie.getDescription();

  // Showing the  ingredient images
  const imageContainer = document.getElementById("smoothieImage");
  imageContainer.innerHTML = ""; 

  smoothie.ingredients.forEach(item => {
    const img = document.createElement("img");
    img.src = `images/${item.toLowerCase()}.jpg`; 
    img.alt = item;
    img.style.width = "120px";
    img.style.margin = "10px";
    img.style.borderRadius = "10px";
    img.style.boxShadow = "0 0 5px gray";
    imageContainer.appendChild(img);
  });
});
