const inputbox=document.getElementById("input")
const listcontainer=document.getElementById("list-container")
function addtask()
{
    if(inputbox.value==="")
    {
        alert("you must add a task")
    }
    else
    {
        let li=document.createElement('li');
        li.innerText=inputbox.value;
        listcontainer.append(li);
        let span=document.createElement('span')
        span.innerHTML="\u00d7"
        li.appendChild(span)
    }
    inputbox.value="";
    saveData();
}
listcontainer.addEventListener("click",function(e)
{
    if(e.target.tagName==="LI")
    {
        e.target.classList.toggle("checked")

    }
    else if(e.target.tagName==="SPAN")

    {
         e.target.parentElement.remove();
    }
},false);
function saveData()
{
    localStorage.setItem("data",listcontainer.innerHTML)
}
function showTask()
{
    listcontainer.innerHTML=localStorage.getItem("data")
}
showTask()
document.getElementById("filter").addEventListener("change", function () {
    let filterValue = this.value;
    let tasks = document.querySelectorAll("#list-container li");

    tasks.forEach(task => {
        let isChecked = task.classList.contains("checked");

        if (filterValue === "all") {
            task.style.display = "flex";
        } else if (filterValue === "completed" && isChecked) {
            task.style.display = "flex";
        } else if (filterValue === "pending" && !isChecked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});
