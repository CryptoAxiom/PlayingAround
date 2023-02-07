const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let passwordEl1 = document.getElementById("password-el-1") 
let passwordEl2 = document.getElementById("password-el-2") 

let passswordLength = 15


function generatePassword() {
    
    let password1 = ""
    let password2 = ""
    for(let i = 0; i < passswordLength; i++){
        password1 += characters[Math.floor(Math.random() * characters.length)]  
        password2 += characters[Math.floor(Math.random() * characters.length)]  
    }   

    passwordEl1.textContent = password1
    passwordEl2.textContent = password2
}


