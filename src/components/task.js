import React, {useState} from 'react';
import {Button, Checkbox} from "@headlessui/react";
import {useLongPress} from "@/utils/useLongPress";

const Task = ({task, setTasks, tasks}) => {

    const setStatus = (status) => {

        setTasks(tasks.map(item => {
            if (task === item) return {...item, status: status || 'default'}
            return item
        }))
        console.log('longpress', task)
    };

    const longPressEvent = useLongPress(setStatus, 1000);

       return (
        <li className={`flex flex-row gap-4 items-center justify-between ${task.status === 'failed' ? 'line-through' +
            ' text-red-800' : ''} ${task.status === 'done' ? 'line-through' +
            ' text-green-800' : ''}`}>
            <Button className={`rounded-full bg-green-600 p-2 ${task.status === 'failed' ? 'hidden' : ''} ${ task.status === 'done' ? 'opacity-50 order-2' : ''}`} onClick={() => setStatus('done')} {...longPressEvent} >
                <svg  className={'size-6'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >

                    <path
                        d="M256 16C123.5 16 16 123.5 16 256c0 132.6 107.5 240 240 240 132.6 0 240-107.4 240-240S388.6 16 256 16zm0 60c99.4 0 180 80.6 180 180s-80.6 180-180 180S76 355.4 76 256 156.6 76 256 76zm91.3 64.2c-6.5 0-12.5 2.4-16.8 8.2-52 70.1-69 96.5-106 169.8-8.4-11.1-65.6-72.4-93.9-94.1-14.2-10.9-41.3 27.2-31.6 37.1C142.6 306.1 220.1 406 232.7 405c21.4-1.7 75.1-136.8 148.8-233.7 8-10.4-15-31.3-34.2-31.1z"
                        fill="#fff" fillOpacity="1"></path>

                </svg>
            </Button>
            <div>
                <p className={''}>{task.text}</p>
                <p className={'font-bold text-right'}>{task.level}</p>
            </div>
            <Button className={`rounded-full bg-red-400 p-2 ${ task.status === 'done' ? 'hidden' : ''} ${ task.status === 'failed' ? 'opacity-50' : ''}`} onClick={() => setStatus('failed')} {...longPressEvent}>
                <svg className={'size-6'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                <path
                        d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z"
                            fill="#fff" fillOpacity="1"></path>

                </svg>
            </Button>
            {/*<Button className={`rounded-full bg-gray-600 p-2 ${task.status === 'default' ? 'hidden' : ''}`} onClick={() => setStatus(task.id, 'default')}>*/}
            {/*    <svg className={'size-6'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >*/}

            {/*        <path*/}
            {/*            d="M248.91 50c11.882-.006 23.875 1.018 35.857 3.13 85.207 15.025 152.077 81.895 167.102 167.102 15.023 85.208-24.944 170.917-99.874 214.178-32.782 18.927-69.254 27.996-105.463 27.553-46.555-.57-92.675-16.865-129.957-48.15l30.855-36.768c50.95 42.75 122.968 49.05 180.566 15.797 57.597-33.254 88.152-98.777 76.603-164.274-11.55-65.497-62.672-116.62-128.17-128.168-51.656-9.108-103.323 7.98-139.17 43.862L185 192H57V64l46.34 46.342C141.758 71.962 194.17 50.03 248.91 50z"*/}
            {/*            fill="#fff" fillOpacity="1"></path>*/}

            {/*    </svg>*/}
            {/*</Button>*/}
        </li>
    );
};

export default Task;