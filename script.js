// fetch the data from api
fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const imageURL = data.imageURL;
    const title = data.title;
    const price = `$${data.price.toFixed(2)}`;
    const description = data.description;
    const sizeOptions = data.sizeOptions;

    document.querySelector('.product-image').src = imageURL;
    document.querySelector('.title').textContent = title;
    document.querySelector('.price').textContent = price;
    document.querySelector('.description').textContent = description;
    
    // create buttons based on sizeOptions. using <a></a> for button
    const sizeButtonsContainer = document.querySelector('.size-buttons');
    sizeOptions.forEach(option => {
      const button = document.createElement('a');
      button.classList.add('size-button');
      button.textContent = option.label;
      button.href = '#';
      button.addEventListener('click', function() {
        const allSizeButtons = document.querySelectorAll('.size-button');
        allSizeButtons.forEach(button => button.classList.remove('selected-size'));
        this.classList.add('selected-size');
      });
      sizeButtonsContainer.appendChild(button);
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the data: ', error);
  });



  // handle mini cart click action
  document.querySelector('.my-cart').addEventListener('click', function(){
    toggleMiniCart();
  })

  function toggleMiniCart() {
    const miniCart = document.querySelector('.mini-cart');
    miniCart.style.display = miniCart.style.display === 'none' ? 'block' : 'none';
  }

  // mini cart
  document.querySelector('.add-to-cart-button').addEventListener('click', function(){
    addToCart();
  })  
  
  function addToCart() {
    // display error message if no product is selected.
    const selectedSize = document.querySelector('.selected-size');
    if (!selectedSize) {
      document.querySelector('.error-message').style.display = 'block';
      return;
    }

    document.querySelector('.error-message').style.display = 'none';

    // add selected product to mini cart
    const miniCart = document.querySelector('.mini-cart');
    const productSize =  selectedSize.textContent;
    const imageURL = document.querySelector('.product-image').src;
    const title = document.querySelector('.title').textContent;
    const price = document.querySelector('.price').textContent;
    const existingProduct = miniCart.querySelector(`[data-size="${productSize}"]`)

    if (existingProduct) {
      const quantityElement = existingProduct.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity ++;
      quantityElement.textContent = quantity;
    } else {
      const newProductRow = document.createElement('div');
      newProductRow.classList.add('product-row');
      newProductRow.dataset.size = productSize;
      newProductRow.innerHTML = `
      <div class="product-info">
          <img src="${imageURL}" alt="${title}">
          <div>
              <h3>${title}</h3>
              <div class="product-price">
                <p class="quantity">1</p>
                <p> x ${price}</p>
              </div>
              <p>Size: ${productSize}</p>
          </div>
      </div>
  `
      miniCart.appendChild(newProductRow);
    }
  }