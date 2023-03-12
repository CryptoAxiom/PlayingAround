import { menuArray} from './data.js'


document.addEventListener('click', function(e){

    if (e.target.dataset.button){
        console.log(e.target.dataset.button)
        addMenuItem(e.target.dataset.button)
    }

   
})



function addMenuItem(menuId){

    console.log("menu:",menuId)


    const targetMenuObj = menuArray.filter(function(item){

        console.log('item', item.id)
        return item.id === menuId
    })[0]

    console.log(targetMenuObj)

}


function getOrderHtml(){
    let orderHtml = ""

    menuArray.forEach(function(item){
        
        let ingredientList = ""

        item.ingredients.forEach(function(ingredient){
            ingredientList += `${ingredient}, `
            
        })
        
        ingredientList = ingredientList.slice(0,-2)
        


        orderHtml +=
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
    


    return orderHtml
}




function render(){
    document.getElementById('order-application').innerHTML = getOrderHtml()
    
}

render()