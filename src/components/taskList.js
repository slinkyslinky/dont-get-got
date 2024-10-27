'use client'
import React, {useEffect} from "react";
import Task from "@/components/task";
const TaskList = ({tasks, setTasks, className}) => {


    return (
        <ul className={`flex flex-col gap-6 ${className}`}>
            {tasks.map((task) => <Task key={task.id} task={task} setTasks={setTasks} tasks={tasks}/>)}
        </ul>
    );
};

export default TaskList;