# Create Course21

    POST courses21/
    
Creates a new set of Courses21 for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
courses | [Course21Info][] | [X] | The set of courses21 to be created.

## Example
### Request

    POST https://[HOST]/courses21

#### Request Body    
```json
{
    "courses": [
    {
        "key": "FSC21",
        "name": "Fisica 2",
        "capacity": 30,
        "semester": "4",
        "initialWeek": 6,
        "weeks": 10,
        "avenue": ["ICN"],
        "typeUF": "M",
        "modules": [
            "266b2fd8-61e4-4b65-be24-8c09f69fd5ea",
            "4043cc8c-8c80-4311-a14b-2ef79c8c9bf9"
        ]
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
            "key": "FSC21",
            "name": "Fisica 2",
            "capacity": 30,
            "semester": "4",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "ICN"
            ],
            "typeUF": "M",
            "modules": [
                {
                    "id": "266b2fd8-61e4-4b65-be24-8c09f69fd5ea",
                    "name": "module1"
                },
                {
                    "id": "4043cc8c-8c80-4311-a14b-2ef79c8c9bf9",
                    "name": "module2"
                }
            ],
            "id": "ab51153c-3aa5-4991-a072-966dbccf1ca3"
        }
    ]
}
```

[Course21Info]: /server/api-docs/courses21/Course21Info.md