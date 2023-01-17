const mockceg = {
    "nodes": [
        {
            "id": "N1",
            "variable": "the red button",
            "condition": "is pushed"
        },
        {
            "id": "N2",
            "variable": "the power",
            "condition": "fails"
        },
        {
            "id": "N3",
            "conjunction": true
        },
        {
            "id": "N4",
            "variable": "the system",
            "condition": "shuts down"
        }
    ],
    "root": "N3",
    "edges": [
        {
            "origin": "N1",
            "target": "N3",
            "negated": false
        },
        {
            "origin": "N2",
            "target": "N3",
            "negated": false
        },
        {
            "origin": "N3",
            "target": "N4",
            "negated": false
        }
    ]
}

export default mockceg