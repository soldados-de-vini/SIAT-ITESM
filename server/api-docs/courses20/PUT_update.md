# PUT TEC20 Course

    PUT courses20/:id
    
Updates the TEC20 course of the given ID.

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
udc | number | The total UDCs that this course has.

## Example
### Request

    POST https://[HOST]/courses20/dffba7b9-8ab8-4d32-a71e-da0d02fd767d

#### Request Body    
```json
{
    "key": "FS3",
    "name": "FS 3",
    "capacity": 35,
    "semester": "8",
    "initialWeek": 11,
    "weeks": 5,
    "avenue": ["ICN", "ISC"],
    "typeUF": "B",
    "udc": 10,
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Updated successfully."
    },
    "result": {
        "id": "dffba7b9-8ab8-4d32-a71e-da0d02fd767d",
        "key": "FS3",
        "name": "FS 3",
        "capacity": 35,
        "semester": "8",
        "initialWeek": 11,
        "weeks": 5,
        "avenue": [
            "ICN",
            "ISC"
        ],
        "typeUF": "B",
        "udc": 10
    }
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md