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
        <div className="container flex flex-col">
            {/* Hero Section with CTA */}
            <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-white py-20">
                <div className="text-center max-w-2xl">
                    <h1 className="text-6xl font-bold text-amber-900 mb-6">Не попадись!</h1>
                    <p className="text-xl text-amber-800 mb-4">Проверь свои знания и умения в захватывающей игре</p>
                    <p className="text-lg text-amber-700 mb-12">Получи задания, покажи, на что ты способен!</p>

                    <Button
                        className={`rounded-2xl bg-amber-600 hover:bg-amber-700 text-amber-50 text-lg font-bold transition-colors ${pageStatus !== 'shown' ? 'px-12 py-5' : 'px-8 py-3'}`}
                        onClick={() => getTasks()}
                    >
                        {Text.cardButton[pageStatus]}
                    </Button>
                </div>
            </section>

            {/* Tasks Section */}
            {pageStatus === 'shown' && (
                <section className="py-12 bg-white">
                    <TaskList className={'mt-10'} tasks={tasks} setTasks={setTasks} />
                </section>
            )}
        </div>
    );
}

export default Home;
export const dynamic = 'force-dynamic'
