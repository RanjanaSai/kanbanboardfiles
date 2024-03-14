const addRef =document.querySelector('.action-wrapper .add');
const modalRef = document.querySelector('.modal');
const textareaRef = document.querySelector('.modal .left-section textarea');
const addbtnRef= document.querySelector('.modal .left-section .addtask');
const taskWrapperBacklogRef =document.querySelector('.kanban-block .backlog-tasks .container.backlog');
const taskWrapperDoingRef =document.querySelector('.kanban-block .doing-tasks .container.doing');
const taskWrapperReviewRef =document.querySelector('.kanban-block .review-tasks .container.review');
const taskWrapperDoneRef =document.querySelector('.kanban-block .done-tasks .container.done');
const rightCategorySelection = document.querySelectorAll('.right-section .category');
const removeRef = document.querySelector('.action-wrapper .delete');
const taskListDeleteRef = document.querySelectorAll('.tasks-wrapper .task .task-delete-icon');
const taskWrapperRef = document.querySelector('.tasks-wrapper');
const taskSearchRef = document.querySelector('.task-search input');


const tasksBacklog = JSON.parse(localStorage.getItem('tasksBacklog') || '[]');
const tasksDoing = JSON.parse(localStorage.getItem('tasksDoing') || '[]');
const tasksReview = JSON.parse(localStorage.getItem('tasksReview') || '[]');
const tasksDone = JSON.parse(localStorage.getItem('tasksDone') || '[]');

function addTasksInDataBacklog(newTask) {
    tasksBacklog.push(newTask);
    localStorage.setItem('tasksBacklog', JSON.stringify(tasksBacklog));
}
function addTasksInDataDoing(newTask) {
    tasksDoing.push(newTask);
    localStorage.setItem('tasksDoing', JSON.stringify(tasksDoing));
}
function addTasksInDataReview(newTask) {
    tasksReview.push(newTask);
    localStorage.setItem('tasksReview', JSON.stringify(tasksReview));
}
function addTasksInDataDone(newTask) {
    tasksDone.push(newTask);
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
}

addRef.addEventListener('click',function(e){
    toggleModal();
})
function toggleModal(){
   const isHidden = modalRef.classList.contains('hide');
    if(isHidden){
        modalRef.classList.remove('hide');
    }
    else{
        modalRef.classList.add('hide');
    }
}
rightCategorySelection.forEach(function(categoryRef) {
    categoryRef.addEventListener('click', function(e) {
        removeAllCategorySelection();
        e.target.classList.add("selected");
    })
});

function removeAllCategorySelection() {
    rightCategorySelection.forEach(function(categoryRef) {
        categoryRef.classList.remove('selected');
    })
}
addbtnRef.addEventListener('click',function(e){
    const rightSelectedCategory = document.querySelector('.right-section .category.selected');
    const selectedCategoryName = rightSelectedCategory.getAttribute('data-category');
    console.log( selectedCategoryName);
    const newTask = {
        id: Math.floor(Math.random()*1000),
        title: textareaRef.value,
        category: selectedCategoryName,
    };
    if(selectedCategoryName==='p1'){
        addTasksInDataBacklog(newTask);
    }
    else if(selectedCategoryName==='p2'){
        addTasksInDataDoing(newTask);
    }
    else if(selectedCategoryName==='p3'){
        addTasksInDataReview(newTask);
    }
    else if(selectedCategoryName==='p4'){
        addTasksInDataDone(newTask);
    }

   
    textareaRef.value = "";
    toggleModal();
    createTask(newTask,selectedCategoryName);
   
})


function createTask(task,selectedCategoryName) {
    const taskRef = document.createElement('div');
    taskRef.className = 'task';
    taskRef.dataset.id = task.id;
    taskRef.dataset.category = task.category;
    taskRef.innerHTML =  `
        <div class="task-category ${task.category}"> </div>
        <div class="task-id">${task.id}</div>
         <div class="task-title"><textarea>${task.title}</textarea></div>
         <div class="task-delete-icon"><i class="fa-solid fa-trash"></i></div>
    `;
    if(selectedCategoryName==='p1'){
        taskWrapperBacklogRef.appendChild(taskRef);
    }
    else if(selectedCategoryName==='p2'){
        taskWrapperDoingRef.appendChild(taskRef);
    }
    else if(selectedCategoryName=='p3'){
        taskWrapperReviewRef.appendChild(taskRef);
    }
    else if(selectedCategoryName=='p4'){
        taskWrapperDoneRef.appendChild(taskRef);
    }

}

//taskWrapperRef.appendChild(taskRef);
    //  const tasktextareaRef = document.querySelector('.task .task-title textarea');
    // textareaRef.addEventListener('change', function(e) {
    //     const updatedTitle = e.target.value;
    //     const currentTaskId = task.id;
    //     const taskCategory = task.category;
       
    //     updatedTitleInData(updatedTitle, currentTaskId,taskCategory);
    // });


function updatedTitleInData(updatedTitle, taskId,selectedCategoryName) {
   
    if(selectedCategoryName==='p1'){
        const selectedTaskIdx = tasks.findIndex((task) => Number(task.id) === Number(taskId));
        const selectedTask = tasks[selectedTaskIdx];
        selectedTask.title = updatedTitle;
        localStorage.setItem('tasksBacklog', JSON.stringify(tasksBacklog));
    }
    else if(selectedCategoryName==='p2'){
        const selectedTaskIdx = tasks.findIndex((task) => Number(task.id) === Number(taskId));
        const selectedTask = tasks[selectedTaskIdx];
        selectedTask.title = updatedTitle;
        localStorage.setItem('tasksDoing', JSON.stringify(tasksDoing));
    }
    else if(selectedCategoryName==='p3'){
        const selectedTaskIdx = tasksBacklog.findIndex((task) => Number(task.id) === Number(taskId));
        const selectedTask = tasks[selectedTaskIdx];
        selectedTask.title = updatedTitle;
        localStorage.setItem('tasksReview', JSON.stringify(tasksReview));
    }
    else if(selectedCategoryName==='p4'){
        const selectedTaskIdx = tasks.findIndex((task) => Number(task.id) === Number(taskId));
        const selectedTask = tasksDone[selectedTaskIdx];
        selectedTask.title = updatedTitle;
        localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
    }
    // localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromData(taskId,taskCategory){
    if(taskCategory==='p1'){
        const selectedTaskIdx= tasksBacklog.findIndex((task)=>Number(task.id)===Number(taskId));
        tasksBacklog.splice( selectedTaskIdx,1);
   
        localStorage.setItem('tasksBacklog', JSON.stringify(tasksBacklog));

       
    }
    else if(taskCategory==='p2'){
        const selectedTaskIdx= tasksDoing.findIndex((task)=>Number(task.id)===Number(taskId));
        tasksDoing.splice( selectedTaskIdx,1);
   
        localStorage.setItem('tasksDoing', JSON.stringify(tasksDoing));

        //console.log(tasks);
    }
    else if(taskCategory==='p3'){
        const selectedTaskIdx= tasksReview.findIndex((task)=>Number(task.id)===Number(taskId));
        tasksReview.splice( selectedTaskIdx,1);
   
        localStorage.setItem('tasksReview', JSON.stringify(tasksReview));
    }
    else if(taskCategory==='p4'){
        const selectedTaskIdx= tasksDone.findIndex((task)=>Number(task.id)===Number(taskId));
        tasksDone.splice( selectedTaskIdx,1);
   
        localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
    }
}



//event Bubbling
taskWrapperRef.addEventListener('click',function(e){
    //console.log(e.target.classList.contains('fa-trash'));
 
    if(e.target.classList.contains('fa-trash')){
        const currentTaskRef= e.target.closest('.task');
        currentTaskRef.remove();
        //const taskId= e.target.getAttribute('task-id');
       const taskId = currentTaskRef.dataset.id;
       const taskCategory = currentTaskRef.dataset.category;
        deleteTaskFromData(taskId,taskCategory);
      
    }

})
removeRef.addEventListener('click', function(e) {
    const isDeleteEnabled = e.target.classList.contains('enabled');
    if (isDeleteEnabled) {
        e.target.classList.remove('enabled');
        taskWrapperRef.dataset.deleteDisabled = true;
    } else {
        e.target.classList.add('enabled');
        taskWrapperRef.dataset.deleteDisabled = false;
    }
})


taskSearchRef.addEventListener("keyup", function(e) {
    taskWrapperRef.innerHTML = "";

    // In-memory Data
    tasksBacklog.forEach((task) => {
        const currentTitle = task.title.toLowerCase();
        const searchText = e.target.value.toLowerCase();
        const taskId = String(task.id);
        const taskCategory =String(task.category);
       
        if (searchText.trim() === "" 
            || currentTitle.includes(searchText) 
            || taskId.includes(searchText)
        ) 
        {
            console.log(taskId);
            console.log(taskCategory);
            createTask(task,taskCategory);
           
        }
    })
    tasksDoing.forEach((task) => {
        const currentTitle = task.title.toLowerCase();
        const searchText = e.target.value.toLowerCase();
        const taskId = String(task.id);
        const taskCategory = task.category;
        
        if (searchText.trim() === "" 
            || currentTitle.includes(searchText) 
            || taskId.includes(searchText)
        ) {
            const taskId = String(task.id);
            const taskCategory = task.category;
            createTask(task,taskCategory);

           
        }
    })
    tasksReview.forEach((task) => {
        const currentTitle = task.title.toLowerCase();
        const searchText = e.target.value.toLowerCase();
        const taskId = String(task.id);
        const taskCategory = task.category;
    
        if (searchText.trim() === "" 
            || currentTitle.includes(searchText) 
            || taskId.includes(searchText)
        ) {
            console.log(taskId);
            console.log(taskCategory);
            createTask(task,taskCategory);
          
        }
    })
    tasksDone.forEach((task) => {
        const currentTitle = task.title.toLowerCase();
        const searchText = e.target.value.toLowerCase();
        const taskId = String(Number(task.id));
        const taskCategory = task.category;
      
        if (searchText.trim() === "" 
            || currentTitle.includes(searchText) 
            || taskId.includes(searchText)
        ) {
            console.log(taskId);
            console.log(taskCategory);
            createTask(task,taskCategory);
            
        }
    })
    
 })

function renderTaskList() {
    tasksBacklog.forEach((task) => {
        createTask(task,'p1');
    })
    tasksDoing.forEach((task) => {
        createTask(task,'p2');
    })
    tasksReview.forEach((task) => {
        createTask(task,'p3');
    })
    tasksDone.forEach((task) => {
        createTask(task,'p4');
    })
}
renderTaskList();
