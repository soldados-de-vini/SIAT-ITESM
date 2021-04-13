# Create Course

    POST courses/
    
Creates a new set of Courses for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
courses | [CourseInfo][] | [X] | The set of courses to be created.

## Example
### Request

    POST https://[HOST]/courses

#### Request Body    
```json
{
    "courses": [
    {
        "key": "MT1",
        "name": "Mate1",
        "capacity": 30,
        "semester": "TEC20",
        "initialWeek": 6,
        "weeks": 10,
        "avenue": ["IIC"],
        "typeUF": "TEC21"
    },
    {
        "key": "MT12",
        "name": "Mate2",
        "capacity": 30,
        "semester": "TEC20",
        "initialWeek": 6,
        "weeks": 10,
        "avenue": ["IIC"],
        "typeUF": "TEC21"
    }]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Courses successfully created."
    },
    "result": [
        {
            "key": "MT1",
            "name": "Mate1",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "TEC21",
            "id": "4a53d76f-c4a8-41b0-b040-e226f0fb4cb0"
        },
        {
            "key": "MT12",
            "name": "Mate2",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "TEC21",
            "id": "f8e86d7d-a36a-49a4-bf56-f596ad258ec5"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md