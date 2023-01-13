const mockceg = {
    "nodes": [
        {
            "id": "E0",
            "variable": "the red button",
            "condition": "is pushed"
        },
        {
            "id": "E1",
            "variable": "the system",
            "condition": "shuts down"
        }
    ],
    "root": "E0",
    "edges": [
        {
            "origin": "E0",
            "target": "E1",
            "negated": false
        }
    ]
}

export default mockceg