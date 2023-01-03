import '../styles/annotation.css'

const short = {
    "Variable": "V",
    "Condition": "C"
}

function Annotation({ x, width, y, level, type }) {
    const textlength = (text) => {
        // calculates the length of a monospaced text
        return text.length * 7.82
    }
    const labelstring = (width < textlength(type)) ? short[type] : type

    const getstartposition = () => {
        return parseInt(x + width/2- (textlength(labelstring)/2))
    }

    return (
        <g>
            <text className="labeltype" x={getstartposition()} y={level === "0" ? "30" : "12"} fill="#000000">{labelstring}</text>
            <g className="annotation">
                <rect className="label" x={x} y={level === "0" ? "18" : "0"} width={width} height="16" stroke="#000000">
                    <title>{type}</title>
                </rect>

                <rect className="span" x={x-level*2} y={y-level*2} width={width+level*4} height={18+level*4} fill="#611a23" stroke="#000000"></rect>
            </g>
        </g>
    );
}

export default Annotation;