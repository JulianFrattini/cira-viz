import React from "react"

function CEGEdge({ x1, y1, x2, y2, weight, negated }) {
    // calculate the center of the edge
    let xcenter = (x1 + x2) / 2
    let ycenter = (y1 + y2) / 2
    if (weight === 1) {
        xcenter += (x2-x1)*0.15
        ycenter += (y2-y1)*0.15
    } else if(weight === 2) {
        xcenter -= (x2-x1)*0.15
        ycenter -= (y2-y1)*0.15
    }

    let arrowheadx = 0
    let arrowheady = 0
    if (weight === 0 || weight === 1) {
        arrowheadx = x1 + (x2 - x1) * 0.88
        arrowheady = y1 + (y2 - y1) * 0.88
    } else if (weight === 2 || weight == 3) {
        arrowheadx = x1 + (x2 - x1) * 0.6
        arrowheady = y1 + (y2 - y1) * 0.6
    } 

    // calculate the angle of the edge
    const dx = x1 - x2
    const dy = y1 - y2
    const theta = Math.atan2(dy, dx)
    const arctheta = theta*180/Math.PI

    // define the arrow 
    const arrowlength = 10
    const arrowangle = 0.1 * Math.PI

    return (
        <g>
            {   negated &&
                <g transform={"rotate("+arctheta+", "+xcenter+", "+ycenter+")"}>
                    <path d={"M " + xcenter + " " + ycenter + " A 2 2 0 0 1 " + (xcenter+10) + " " + ycenter} stroke="black" fill="white" />
                    <path d={"M " + (xcenter-10) + " " + ycenter + " A 2 2 0 0 0 " + xcenter + " " + ycenter} stroke="black" fill="white" />
                </g>
            }

            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black"></line>

            <line x1={arrowheadx} y1={arrowheady} x2={arrowheadx + Math.cos(theta + arrowangle) * arrowlength} y2={arrowheady + Math.sin(theta + arrowangle) * arrowlength} stroke="black"></line>
            <line x1={arrowheadx} y1={arrowheady} x2={arrowheadx + Math.cos(theta - arrowangle) * arrowlength} y2={arrowheady + Math.sin(theta - arrowangle) * arrowlength} stroke="black"></line>
        </g>
    )
};

export default CEGEdge;
