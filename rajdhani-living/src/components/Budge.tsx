"use client";

import React from 'react'
import CountUp from 'react-countup'

type budgeProps = {
    containerStyle: string,
    endCountNum: number,
    endCountText: string
}
const Budge = ({containerStyle , endCountNum, endCountText} : budgeProps) => {
    return (
        <div className={`${containerStyle}`}>
            <div>
                <CountUp end={endCountNum} delay={1} duration={4}/>
                {endCountText}
            </div>
        </div>
    )
}

export default Budge