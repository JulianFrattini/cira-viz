import React from "react"

import '../styles/node.css'

const nodewidth = 200
const nodeheight = 70

function EventNode({ node, x, y }) {  
    return (
        <g>
            <rect x={x} y={y} width={nodewidth} height={nodeheight} fill={"#EEEEEE"} stroke="#111111" rx="4"></rect>
            <text className='centeredtext' x={x+nodewidth/2} y={y+16} fill="#000000" fontWeight='bold'>{node.variable}</text>
            <text className='centeredtext' x={x+nodewidth/2} y={y+32} fill="#000000">{node.condition}</text>
        </g>
    )
  };

export default EventNode;
