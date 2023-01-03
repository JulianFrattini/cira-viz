import Annotation from "./Annotation";

import mocklabels from "../util/mocklabels"

import React, { useState, useEffect } from 'react'

function LabelVisualizer({ text }) {
    const [labels, setLabels] = useState([])

    const getposition = (index) => {
        var sen = document.getElementById("sentence")
        const position = sen.getStartPositionOfChar(index).x
        return parseInt(position)
    }

    useEffect(() => {
        setLabels(mocklabels)
    }, []);

    return (
        <svg width="800" height="60">
            {
                labels.map((item, index) => {
                    return <Annotation key={index} x={getposition(item.start)} y="40" width={getposition(item.end) - getposition(item.start)} type={item.type}></Annotation>
                })
            }
            <text id="sentence" x="5" y="55" fill="black">{text}</text>
        </svg>
    );
}

export default LabelVisualizer;