# PUT Course

    PUT courses/:id
    
Updates the course of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
key | string | [x] | The identifier key of the course.
name | string | [x] | Name of the course.
capacity | int | [x] | Max student capacity.
semester | string | [x] | Identifier that specifies which semester is taking the course.
initialWeek | int | [x] | Week in which the course must start on a period.
weeks | int | [x] | Duration of the course in a period.
avenue | string[] | [x] | The set of avenues that this course belongs to.
typeUF | string | [x] | Identifies the type of course.

## Example
### Request

    POST https://[HOST]/courses/f8e86d7d-a36a-49a4-bf56-f596ad258ec5

#### Request Body    
```json
{
    "key": "MT1",
    "name": "Mate1 Cambiada",
    "capacity": 30,
    "educationalModel": "B",
    "semester": "TEC20",
    "initialWeek": 6,
    "weeks": 10,
    "avenue": ["IIC"],
    "typeUF": "TEC21"
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Course updated successfully."
    },
    "result": {
        "id": "f8e86d7d-a36a-49a4-bf56-f596ad258ec5",
        "key": "MT1",
        "name": "Mate1 Cambiada",
        "capacity": 30,
        "semester": "TEC20",
        "initialWeek": 6,
        "weeks": 10,
        "avenue": [
            "IIC"
        ],
        "typeUF": "TEC21",
        "educationalModel": "B"
    }
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md