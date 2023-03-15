import { menuArray } from './data.js'

//initiate array to store orders
let orderArray = []


document.addEventListener('click', function(e){

    if (e.target.dataset.button){
        addMenuItem(e.target.dataset.button)
    }
})


function addMenuItem(menuId){

    const targetMenuObj = menuArray.filter(function(item){
    
        return item.id === parseInt(menuId)
    })[0]

    orderArray.push(targetMenuObj)

}


function getOrderHtml() {
    let orderHtml = ""
    orderArray.forEach(function(order){
    


    orderHtml =+ `
    <div class="summary-item">
        <div class='summary-title'>
            <h2>Your order:</h2>
        </div>
        <div class="summary">
            <!-- summary goes here --> 
        </div>
        <div class="summary-total">
            <h2>
                Total price: 
            </h2>
        </div>
        <div>
            <button>
                Complete order
            </button>
        </div>
    </div>

    `
    })
    return orderHtml
}




function getMenuHtml(){

    // Here comes the order html

    let menuHtml = ""

    menuArray.forEach(function(item){
        
        let ingredientList = ""

        item.ingredients.forEach(function(ingredient){
            ingredientList += `${ingredient}, `
            
        })
        
        ingredientList = ingredientList.slice(0,-2)
        


        menuHtml +=
        `
        <div class="menu-item" id=${item.id}>
            <div class="menu-left">
                <div class="menu-icon">
                    <h1>${item.emoji}</h1>
                </div>
                <div class="menu-information">
                    <h2 class="menu-name">${item.name}</h2>
                    <p class="menu-ingredients">${ingredientList}<p>
                    <h3 class="menu-price">$${item.price}</h3>
                </div>
            </div>
            <div 
            class="menu-right">
                <button 
                class="menu-button"
                data-button="${item.id}"
                >+</button>
            </div>
        </div>
        `
    })
    
    return menuHtml
}

function render(){
    document.getElementById('order-section').innerHTML = getMenuHtml()
    
    document.getElementById('summary-section').innerHTML = getOrderHtml()
    
}

render()