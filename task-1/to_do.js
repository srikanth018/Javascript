function add(){

    let text = document.getElementById("task").value;

    let li = document.createElement("li");
    li.innerHTML=(`
        <input type="checkbox" id="check" onchange="check(this)">
        <label for="check">${text}</label>
        <button onclick="remove(this)">Remove</button>
    `);
    document.getElementById("list").appendChild(li);
    document.getElementById("task").value = "";
}

function remove(button){
    button.parentElement.remove();
}

function check(check){
    if(check.checked){
        check.nextElementSibling.style.textDecoration = "line-through";
        
    }else{
        check.nextElementSibling.style.textDecoration = "none";
    }
}
