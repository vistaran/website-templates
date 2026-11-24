"use client"
import React, { useEffect, useState } from 'react';

const useScrollProcess = () => {
    const [completion , setCompletion] = useState(0);
    useEffect(()=> {
        const updateScrollProcess = ()=> {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if(scrollHeight){
                setCompletion(Number(currentProgress/scrollHeight)*100)
            }
        }
        window.addEventListener('scroll' , updateScrollProcess)
        return ()=> {window.removeEventListener('scroll' , updateScrollProcess)}
    }
    ,[])
    return completion
}

export default useScrollProcess;