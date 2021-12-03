import {useEffect, useRef} from "react";

export const useClickOutside = (handler: () => void) => {
    //закрываем меню при клике снаружи
    const nodeDomRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {

        const maybeHandler = (e: MouseEvent) => {
            if (!nodeDomRef.current?.contains((e.target) as Node | null))
                handler();
        }

        document.addEventListener('click', maybeHandler);

        return () => {
            document.removeEventListener('click', maybeHandler);
        }
    })

    return nodeDomRef
}