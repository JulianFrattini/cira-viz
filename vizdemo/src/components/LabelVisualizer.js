import Annotation from "./Annotation";

function LabelVisualizer({text}) {
    const labels = [
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
        }
    ]

    const getposition = (index) => {
        var sen = document.getElementById("sentence")
        const position = sen.getStartPositionOfChar(index).x
        return parseInt(position)
    }

    return (
      <svg width="800" height="100">
        <text id="sentence" x="5" y="55" fill="black">If the red button is pushed the system shuts down.</text>

        {
            labels.map((item, index) => {
                return <Annotation key={index} x={getposition(item.start)} y="40" width={getposition(item.end)-getposition(item.start)} level="0" type={item.type}></Annotation>
            })
        }
      </svg>
    );
  } 
  
  export default LabelVisualizer;