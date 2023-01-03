import '../styles/annotation.css'

import labeltypes from '../util/labeltypes'

function Annotation({ x, width, y, level, type }) { 
    const textlength = (text) => {
        // calculates the length of a monospaced text
        return text.length * 7.82
    }
    const labeltype = labeltypes.filter(l => l.label === type)[0];
    const labelstring = (width < textlength(type)) ? labeltype.short : type;
    const color = labeltype.color;

    const getstartposition = () => { 
        return parseInt(x + width/2- (textlength(labelstring)/2))
    } 

    return (
        <g>
            <g className="annotation">
                <rect className="label" x={x} y={level === "0" ? "19" : "1"} width={width} height="16" stroke="#000000" rx="2" fill={color}>
                    <title>{type}</title>
                </rect>
                <text className="labeltype" x={getstartposition()} y={level === "0" ? "31" : "13"} fill="#000000">{labelstring}</text>

                <rect className="span" x={x-level*2} y={y-level*2} width={width+level*4} height={18+level*4} fill={color}></rect>
            </g>
        </g>
    );
}

export default Annotation;