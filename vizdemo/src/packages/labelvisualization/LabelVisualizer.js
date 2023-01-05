import Annotation from "./components/Annotation";

import React, { useState, useEffect } from 'react'

function LabelVisualizer({ text, labels }) {
    const [renderlabels, setRenderlabels] = useState([])

    useEffect( () => {
        setRenderlabels(labels);
     }, []);

    const getposition = (index) => {
        var sen = document.getElementById("sentence")
        const position = sen.getStartPositionOfChar(index).x
        return parseInt(position)
    }

    return (
        <svg width="800" height="60">
            <text id="sentence" x="5" y="55" fill="black">{text}</text>
            { 
                renderlabels.map((item, index) => {
                    return <Annotation key={index} x={getposition(item.start)} y="40" width={getposition(item.end) - getposition(item.start)} type={item.type}></Annotation>
                })
            } 
        </svg>
    );
}

export default LabelVisualizer;