import '../styles/annotation.css'

function Annotation({ x, width, y, level, type }) {
    const textlength = (text) => {
        // calculates the length of a monospaced text
        return text.length * 7.82
    }

    return (
        <g>
            <text className="labeltype" x="44" y={level === "0" ? "34" : "16"} fill="#000000">{type}</text>
            <g className="annotation">
                <rect className="label" x="44" y={level === "0" ? "18" : "0"} width={textlength(type)} height="16" stroke="#000000"></rect>
                <rect className="span" x={x} y={y} width={width} height="18" fill="#611a23" stroke="#000000"></rect>
            </g>
        </g>
    );
}

export default Annotation;