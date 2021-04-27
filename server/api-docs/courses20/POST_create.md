# Create Course 20

    POST courses20/
    
Creates a new set of TEC 20 Courses for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
courses | [CourseInfo][] | [X] | The set of courses 20 to be created.

## Example
### Request

    POST https://[HOST]/courses20

#### Request Body    
```json
{
    "courses": [
    {
        "key": "FSC22",
        "name": "Fisica 3",
        "capacity": 30,
        "semester": "6",
        "initialWeek": 6,
        "weeks": 5,
        "avenue": ["ICN", "ISC"],
        "typeUF": "TEC20"
    }]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Created successfully."
    },
    "result": [
        {
            "key": "FSC22",
            "name": "Fisica 3",
            "capacity": 30,
            "semester": "6",
            "initialWeek": 6,
            "weeks": 5,
            "avenue": [
                "ICN",
                "ISC"
            ],
            "typeUF": "TEC20",
            "id": "dffba7b9-8ab8-4d32-a71e-da0d02fd767d"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md