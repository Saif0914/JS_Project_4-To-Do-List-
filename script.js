let tasks = [];

const addTask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStas();
    }
};

const toggleTastComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStas();
};

const deleteTask = (index) =>{
    tasks.splice(index,1);
    updateTaskList();
    updateStas();
};

const editTask = (index) =>{
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTaskList();
    updateStas();
};

const updateStas = ()=> {
    const completeTasks = tasks.filter((task)=> task.completed).length;
    const totalTask = tasks.length;
    const progress = (completeTasks / totalTask ) * 100;

    const progressBar = document.getElementsByClassName("progress")[0];
    
    progressBar.style.width = `${progress}% `;

    document.getElementsByClassName("number")[0].innerText = `${completeTasks} / ${totalTask}`;

};


const updateTaskList = ()=> {
    const taskList = document.getElementById("task_list");
    taskList.innerHTML = "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class= "taskItem">
            <div class= "task ${task.completed ?"completed":""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                } />
                <p> ${task.text}</p>
            </div>
            <div class="icon">
                <img src="edit.png" onclick="editTask(${index})" />
                <img src="delete.png" onclick="deleteTask(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener("change", ()=> toggleTastComplete(index));
        taskList.appendChild(listItem);
    })
}

document.getElementById("submit").addEventListener("click", function (e){
    e.preventDefault();

    addTask();
})