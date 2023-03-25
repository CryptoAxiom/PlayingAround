import { menuArray } from './data.js'


const orderSection = document.getElementById('summary-section')
const totalPriceElement = document.querySelector('.total-price h3');

//initiate array to store orders
const orderSummary =[]

//initiate variable to store total order price
let totalPrice = 0
totalPriceElement.innerHTML = `$${totalPrice}`


//event listener

document.addEventListener('click', function(e){

    if (e.target.dataset.button){
        addMenuItem(e.target.dataset.button)
    }

    if(e.target.dataset.remove){
       
        removeOrderItem(e.target.dataset.remove)
        
    }
})

//add menu item

function addMenuItem(menuId){
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


function removeOrderItem(orderId){
    
    if(orderSummary.length < 1) {
        orderSection.classList.add('flex')
    }

    const targeOrderObj = orderSummary.filter(function(item){
        return item.id === parseInt(orderId)
    })[0]

    console.log("targetobject", targeOrderObj)

    render()
    console.log("price total", totalPrice)


    

    // for (const order of orderSummary){
    //     let removeOrder = orderSummary.find(function(remove)){

    //         console.log("target object id", targeOrderObj.id)
    //         console.log("order id", order.id)
    //         console.log("from click", orderId)
    //         return  remove.id === order.
    //     }

        // console.log("order to be removed", removeOrder)
        

        // if(removeOrder) {
        //     // console.log(removeOrder)

        //     console.log(removeOrder.quantity)
        //     if (removeOrder.quantity >= 2) {
        //         let itemPrice = removeOrder.price / removeOrder.quantity
        //         console.log("order quality more ")
        //         removeOrder.quantity -= 1
        //         removeOrder.price -= itemPrice
        //         totalPrice -= itemPrice
        //         removeOrder = removeOrder

        //     }
        //     else if (removeOrder.quantity <= 1) {
        //         orderSummary.pop(removeOrder)
        //         totalPrice -= removeOrder.price
        //     }
        // }

        // console.log("order to remove", removeOrder)

        // if (removeOrder[0].quantity > 1) {

        //     console.log(removeOrder[0])
        //     console.log("type", typeof(removeOrder[0].quantity))

        //     
        //     removeOrder[0].quantity -= 1
        //     
        //     totalPrice -= itemPrice
        // }
        // else if (removeOrder[0].quantity < 1) {
        //     orderSummary.pop(targeOrderObj)
        //     totalPrice -= targeOrderObj.price
        // }

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
                    data-button="${menuItem.id}"
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