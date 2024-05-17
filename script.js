document.addEventListener('DOMContentLoaded', function() {
    const items = [
       
        { id: 1, name: "Heels", price: 500 ,imageUrl: "1.png"},
        { id: 2, name: "Sport", price: 600 ,imageUrl: "2.png"},
        { id: 3, name: "Heels", price: 550 ,imageUrl: "3.png"},
        { id: 4, name: "Sport", price: 400 ,imageUrl: "4.png"},
        { id: 5, name: "Sport", price: 510 ,imageUrl: "5.png"},
        { id: 6, name: "Sport", price: 520 ,imageUrl: "6.png"},
        { id: 7, name: "Sport", price: 540 ,imageUrl: "7.png"},
        { id: 8, name: "Work", price: 600 ,imageUrl: "8.png"},
        { id: 9, name: "Work", price: 650 ,imageUrl: "9.png"},
        { id: 10, name: "School", price: 400 ,imageUrl: "10.png"},
        { id: 11, name: "Work", price: 700 ,imageUrl: "11.png"},
        { id: 12, name: "School", price: 680 ,imageUrl: "12.png"},
        { id: 13, name: "Heels", price: 530 ,imageUrl: "13.png"},
        { id: 14, name: "Heels", price: 505 ,imageUrl: "14.png"},
        { id: 15, name: "Heels", price: 523 ,imageUrl: "15.png"}
    ];

    const itemsRow = document.getElementById('items-row');
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentModal = $('#paymentModal');
    const paymentForm = document.getElementById('payment-form');
    const totalItemsElem = document.getElementById('total-items');
    const totalPriceElem = document.getElementById('total-price');

    // Display items
    items.forEach(item => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4');
        colDiv.innerHTML = `
            <div class="item-card" style="margin-bottom: 5px;">
                <div class="item-details">
                    <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%;">
                    <h3>${item.name}</h3>
                    <p>₱${item.price}</p>
                </div>
                <button class="btn btn-success btn-block" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>`;
        itemsRow.appendChild(colDiv);
    });
    

    // Add item to cart
    window.addToCart = function(itemId) {
        const item = items.find(item => item.id === itemId);
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'cart-item');
        li.innerHTML = `${item.name} - ₱${item.price} <button class="btn btn-danger btn-xs pull-right remove-btn">X</button>`;
        cartItems.appendChild(li);
        updateTotalItems();
    };

    // Update total items and total price
    function updateTotalItems() {
        const totalItems = cartItems.children.length;
        const totalPrice = Array.from(cartItems.children).reduce((acc, item) => {
            const price = parseFloat(item.innerHTML.split(' - ')[1].substring(1));
            return acc + price;
        }, 0);
        totalItemsElem.textContent = `Total Items: ${totalItems}`;
        totalPriceElem.textContent = `Total Price: ₱${totalPrice.toFixed(2)}`;
    }

    // Checkout
    checkoutBtn.addEventListener('click', function() {
        const total = Array.from(cartItems.children).reduce((acc, item) => {
            const price = parseFloat(item.innerHTML.split(' - ')[1].substring(1));
            return acc + price;
        }, 0);
        if (cartItems.children.length === 0) {
            alert('Your cart is empty');
            return;
        }
        // Show total amount in the modal
        const modalBody = paymentModal.find('.modal-body');
        modalBody.find('#total-price-payment').text(`Total Price: ₱${total.toFixed(2)}`);
        paymentModal.modal('show');
    });

    // Payment form submission
paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const gcashNumber = document.getElementById('gcash-number').value;
    const paymentAmount = parseFloat(document.getElementById('payment-amount').value);
    const total = Array.from(cartItems.children).reduce((acc, item) => {
        const price = parseFloat(item.innerHTML.split(' - ')[1].substring(1));
        return acc + price;
    }, 0);
    const change = paymentAmount - total;
    if (change < 0) {
        alert('Insufficient payment amount');
        return;
    }
    // Total payment amount 
    const totalPayment = paymentAmount + change; 
    alert(`Payment Successful!\nCustomer Name: ${gcashNumber}\nTotal Price: ₱${total.toFixed(2)}\nTotal Payment Amount: ₱${totalPayment.toFixed(2)}\nTotal Change: ₱${change.toFixed(2)}`);
    paymentModal.modal('hide');
  
    cartItems.innerHTML = '';
    updateTotalItems();
});


    // Total Change
    $('#payment-amount').on('input', function() {
        const paymentAmount = parseFloat($(this).val());
        const total = Array.from(cartItems.children).reduce((acc, item) => {
            const price = parseFloat(item.innerHTML.split(' - ')[1].substring(1));
            return acc + price;
        }, 0);
        const change = paymentAmount - total;
        $('#total-change').text(`Total Change: ₱${change.toFixed(2)}`);
    });
});

// Remove item from cart
$(document).on('click', '.remove-btn', function() {
    $(this).closest('.cart-item').remove();
    updateTotalItems();
});
