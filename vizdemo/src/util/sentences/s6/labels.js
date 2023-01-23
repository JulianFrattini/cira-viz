const mocklabels = [
    {
        "id": "T2",
        "name": "Cause1",
        "begin": 3,
        "end": 22,
        "successor": {
            "id": "T6",
            "junctor": "AND"
        },
        "children": [
            "T3",
            "T4"
        ]
    },
    {
        "id": "T3",
        "name": "Variable",
        "begin": 3,
        "end": 11,
        "parent": "T2"
    },
    {
        "id": "T4",
        "name": "Condition",
        "begin": 12,
        "end": 22,
        "parent": "T2"
    },
    {
        "id": "T5",
        "name": "Conjunction",
        "begin": 23,
        "end": 26,
        "parent": null
    },
    {
        "id": "T6",
        "name": "Cause2",
        "begin": 27,
        "end": 49,
        "successor": {
            "id": "T10",
            "junctor": "OR"
        },
        "children": [
            "T7",
            "T8"
        ]
    },
    {
        "id": "T7",
        "name": "Variable",
        "begin": 27,
        "end": 39,
        "parent": "T6"
    },
    {
        "id": "T8",
        "name": "Condition",
        "begin": 40,
        "end": 49,
        "parent": "T6"
    },
    {
        "id": "T9",
        "name": "Disjunction",
        "begin": 50,
        "end": 52,
        "parent": null
    },
    {
        "id": "T10",
        "name": "Cause3",
        "begin": 53,
        "end": 78,
        "successor": {
            "id": "T14",
            "junctor": null
        },
        "children": [
            "T11",
            "T12"
        ]
    },
    {
        "id": "T11",
        "name": "Variable",
        "begin": 53,
        "end": 65,
        "parent": "T10"
    },
    {
        "id": "T12",
        "name": "Condition",
        "begin": 66,
        "end": 78,
        "parent": "T10"
    },
    {
        "id": "T14",
        "name": "Effect1",
        "begin": 84,
        "end": 111,
        "successor": null,
        "children": [
            "T15",
            "T16"
        ]
    },
    {
        "id": "T15",
        "name": "Variable",
        "begin": 84,
        "end": 95,
        "parent": "T14"
    },
    {
        "id": "T16",
        "name": "Condition",
        "begin": 96,
        "end": 111,
        "parent": "T14"
    }
]

export default mocklabels