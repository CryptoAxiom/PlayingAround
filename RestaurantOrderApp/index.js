//import data
import { menuArray } from './data.js'

//get elements from page
const orderSection = document.getElementById('summary-section')
const totalPriceElement = document.querySelector('.total-price h3');
const orderButton = document.getElementById('order-button')
const checkoutModal = document.getElementById('checkout-modal')
const cardDetail = document.getElementById('customer-card')
const cvv = document.getElementById('customer-cvv')
const customerName = document.getElementById('customer-name')


//initiate array to store orders
const orderSummary =[]

//initiate variable to store total order price
let totalPrice = 0


//event listener inputs
document.addEventListener('input', function(){
    if(cardDetail.value.length > 16) {
        cardDetail.value = cardDetail.value.slice(0,16)
    }

    if (cvv.value.length > 3) {
        cvv.value = cvv.value.slice(0,3)
    }

})

//event listener clicks
document.addEventListener('click', function(e){

    if (e.target.dataset.menuButton){
        addOrderItem(e.target.dataset.menuButton)
    }

    if(e.target.dataset.remove){
       
        removeOrderItem(e.target.dataset.remove)
    }

    if(e.target.dataset.order){
        customerDetails()
    }

    if(e.target.dataset.pay) {
        payOrder()
    }
    

})

//add order from menu

function addOrderItem(menuId){
    let orderArray = []

    const targetMenuObj = menuArray.filter(function(item){
        return item.id === parseInt(menuId)
    })[0]

    totalPrice += targetMenuObj.price
    
    orderArray.push(targetMenuObj)


    if(orderArray.length > 0){
        //show order section
        orderSection.classList.remove("hidden");  

        for(const order of orderArray){
            let existingOrder = orderSummary.find(function(item){
                 return item.id === order.id
            })

            if(existingOrder) {
                existingOrder.quantity += 1;
                existingOrder.price += order.price
            } else{
                orderSummary.push({...order, quantity: 1})
            }
        }
    }
    render()
}

//remove order

function removeOrderItem(orderId){   

    if(orderSummary.length < 1) {
        orderSection.classList.add('flex')
    }

    const targeOrderObj = orderSummary.findIndex(function(item){
        return item.id === parseInt(orderId)
    })
    
    let removeOrder = orderSummary[targeOrderObj]
    let itemPrice = removeOrder.price / removeOrder.quantity

    if (removeOrder.quantity <= 1) {
        totalPrice -= removeOrder.price
        orderSection.classList.add('flex')
        orderSummary.splice(targeOrderObj,1)
    }

    else{
        removeOrder.quantity -= 1
        removeOrder.price -= itemPrice
        totalPrice -= itemPrice
    }

    render()

}

// get modal

function customerDetails() {
    if(totalPrice){
        //show modal
        checkoutModal.style.display = 'block';
    }
    else{
        alert('Please add at least one item to make the order')
    }

}


// execute payment

function payOrder() {

    if(customerName.value !== "" || cardDetail.value !== "" || cvv.value !== "" ) {
        checkoutModal.style.display = 'none';

        let filledName = customerName.value

        orderSection.innerHTML = `
        <div class="order-complete">
            <h1>Thanks, ${filledName}! Your order is on it's way!</h1>
        </div>
        `  
    }
    else {
        alert('Please fill all fields as they are required information')

    }
}

//get orders

function getOrderHtml() {

    let orderHtml = ""

        orderSummary.forEach(function(order){

            orderHtml +=
            `
                <div class="order-item" id=${order.id}>
                    <div class="order-name"> 
                        <h2>
                            ${order.quantity}x ${order.name}
                        </h2>
                        <div class="order-remove" id="${order.id}" >
                            <p data-remove="${order.id}">
                                remove
                            </p>
                        </div>
                    </div>
                    <div class="order-price">
                        <h3>
                            $${order.price}
                        </h3>
                    </div>
                </div>
            `
            })
    return orderHtml
    }   
    

//get the menu

function getMenuHtml(){

    let menuHtml = ""

    menuArray.forEach(function(menuItem){
        
        let ingredientList = ""

        menuItem.ingredients.forEach(function(ingredient){
            ingredientList += `${ingredient}, `
            
        })
        
        ingredientList = ingredientList.slice(0,-2)
        

        menuHtml +=
        `
        <div class="menu-item" id=${menuItem.id}>
            <div class="menu-left">
                <div class="menu-icon">
                    <h1>${menuItem.emoji}</h1>
                </div>
                <div class="menu-information">
                    <h2 class="menu-name">${menuItem.name}</h2>
                    <p class="menu-ingredients">${ingredientList}<p>
                    <h3 class="menu-price">$${menuItem.price}</h3>
                </div>
            </div>
            <div class="menu-right">
                <button 
                    class="menu-button"
                    data-menu-button="${menuItem.id}"
                >+</button>
            </div>
        </div>
        `
    })
    
    return menuHtml
}

//render the application

function render(){
    document.getElementById('order-section').innerHTML = getMenuHtml()
    document.getElementById('summary-order').innerHTML = getOrderHtml()
    document.querySelector('.total-price h3').innerHTML = `$${totalPrice}`
}

render()