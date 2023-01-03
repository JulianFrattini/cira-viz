import Annotation from "./Annotation";

import React, {useState, useEffect} from 'react'

function LabelVisualizer({ text }) {
    const [labels, setLabels] = useState([])

    const getposition = (index) => {
        var sen = document.getElementById("sentence")
        const position = sen.getStartPositionOfChar(index).x
        return parseInt(position)
    }

    useEffect(() => {
        setLabels([
            {
                id: 0,
                type: "Variable",
                start: 3,
                end: 17
            }, {
                id: 1,
                type: "Condition",
                start: 18,
                end: 27 
            }, {
                id: 2,
                type: "Cause1",
                start: 3,
                end: 27
            }, {
                id: 3,
                type: "Variable",
                start: 28,
                end: 38
            }, {
                id: 4,
                type: "Condition",
                start: 39,
                end: 49 
            }, {
                id: 5,
                type: "Effect1",
                start: 28,
                end: 49
            }
        ])
    }, []);

    return (
        <svg width="800" height="100">
            <text id="sentence" x="5" y="55" fill="black">{text}</text>

            <g>
                {
                    labels.map((item, index) => {
                        return <Annotation key={index} x={getposition(item.start)} y="40" width={getposition(item.end) - getposition(item.start)} level={item.type.startsWith("Cause") || item.type.startsWith("Effect") ? "1" : "0"} type={item.type}></Annotation>
                        //return <Annotation key={index} x={0} y="40" width={100} level={1} type={item.type}></Annotation> 
                    })
                }
            </g>
        </svg>
    );
}

export default LabelVisualizer;