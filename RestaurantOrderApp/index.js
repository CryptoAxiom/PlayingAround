import { menuArray } from './data.js'


const orderSection = document.getElementById('summary-section')
//initiate array to store orders
let orderArray = []

//initiate variable to store total order price
let totalPrice = 0


//event listener

document.addEventListener('click', function(e){

    if (e.target.dataset.button){
        addMenuItem(e.target.dataset.button)
    }
})

//add menu item

function addMenuItem(menuId){

    const targetMenuObj = menuArray.filter(function(item){
    
        return item.id === parseInt(menuId)
    })[0]

    orderArray.push(targetMenuObj)


    render()
}

//get orders

function getOrderHtml() {


    console.log("array length", orderArray.length)


    let orderHtml = ""

    if(orderArray.length > 0){
        orderSection.classList.remove("hidden");  
        

        orderArray.forEach(function(order){
            
            totalPrice += order.price
            


            orderHtml +=
            `
                <div class="order-item" id=${order.id}>
                    <div class="order-name"> 
                        <h2>
                            ${order.name}
                        </h2>
                        <div class="order-remove">
                        <p>
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

    }   
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
}

render()