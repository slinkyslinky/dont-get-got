import { useState, useRef } from 'react';

export const useLongPress = (onLongPress, delay = 1000) => {
    const [isLongPress, setIsLongPress] = useState(false);
    const timerRef = useRef(null);

    // Функция запуска таймера долгого нажатия
    const start = () => {

        timerRef.current = setTimeout(() => {
            setIsLongPress(true);
            onLongPress(); // Вызываем переданную функцию для долгого нажатия
        }, delay);
    };

    // Остановка таймера долгого нажатия
    const stop = () => {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        if (isLongPress) setIsLongPress(false); // Сбрасываем состояние, если таймер был завершён
    };

    // Возвращаем нужные обработчики событий
    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
};