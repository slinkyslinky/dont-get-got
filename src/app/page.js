'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@headlessui/react";
import TaskList from "@/components/taskList";

const Text = {
    cardButton: {
        default: 'Получить задания',
        cached: 'Показать задания',
        shown: 'Скрыть задания'
    }
}


function Home(props) {
    const [tasks, setTasks] = useState([])
    const [pageStatus, setPageStatus] = useState('default')

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            localStorage.setItem('tasks', JSON.stringify(tasks));

        } else {
            isFirstRender.current = false
            if (localStorage.getItem('tasks')) {
                setPageStatus('cached')
            }
        }
    }, [tasks]);

    const getTasks = async () => {
        let data;
        if (pageStatus !== 'shown') {
            const cached = JSON.parse(localStorage.getItem('tasks'))
            if (!cached || cached.length === 0) {
                const resp = await fetch('http://localhost:3000/api/tasks')
                data = (await resp.json()).map(task => ({...task, status: task.status ? task.status : 'default'}))
            } else {
                data = cached
            }
            setTasks(data)
            setPageStatus('shown')
        } else {
            setPageStatus('cached')
        }

    }



    return (
        <div className="container flex flex-col ">
            <h1 className={'text-4xl font-bold text-amber-900 my-2'}>Не попадись!</h1>
            <Button className={`rounded-2xl bg-amber-600 text-amber-50 text-lg font-bold self-center order-2 ${pageStatus !== 'shown' ? 'p-10 mt-80' : 'p-2 mt-8'}`} onClick={() => getTasks()} >
                {Text.cardButton[pageStatus]}
            </Button>
            {pageStatus === 'shown' ? <TaskList className={'mt-10'} tasks={tasks} setTasks={setTasks} /> : ''}
        </div>
    );
}

export default Home;