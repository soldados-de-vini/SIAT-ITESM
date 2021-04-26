# PUT Course21

    PUT courses21/:id
    
Updates the course21 of the given ID.

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
modules | string[] | [ ] | The id of the modules that are part of this course.

## Example
### Request

    POST https://[HOST]/courses21/ab51153c-3aa5-4991-a072-966dbccf1ca3
#### Request Body    
```json
{
    "key": "FSC22",
    "name": "Fisica 3",
    "capacity": 31,
    "semester": "5",
    "initialWeek": 7,
    "weeks": 15,
    "avenue": ["IMC", "ISC"],
    "typeUF": "B",
    "modules": ["266b2fd8-61e4-4b65-be24-8c09f69fd5ea"]
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
        "id": "ab51153c-3aa5-4991-a072-966dbccf1ca3",
        "key": "FSC22",
        "name": "Fisica 3",
        "capacity": 31,
        "semester": "5",
        "initialWeek": 7,
        "weeks": 15,
        "avenue": [
            "IMC",
            "ISC"
        ],
        "typeUF": "B",
        "modules": [
            {
                "id": "266b2fd8-61e4-4b65-be24-8c09f69fd5ea",
                "name": "module1"
            }
        ]
    }
}
```

