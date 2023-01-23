const mockceg = {
    "nodes": [
        {
            "id": "N1",
            "variable": "an error",
            "condition": "is present"
        },
        {
            "id": "N2",
            "variable": "the debugger",
            "condition": "is active"
        },
        {
            "id": "N3",
            "conjunction": true
        },
        {
            "id": "N4",
            "variable": "an exception",
            "condition": "is triggered"
        },
        {
            "id": "N5",
            "conjunction": false
        },
        {
            "id": "N6",
            "variable": "a log entry",
            "condition": "will be created"
        }
    ],
    "root": "N5",
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
            "target": "N5",
            "negated": false
        },
        {
            "origin": "N4",
            "target": "N5",
            "negated": false
        },
        {
            "origin": "N5",
            "target": "N6",
            "negated": false
        }
    ]
}

export default mockceg