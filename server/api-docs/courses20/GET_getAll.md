# Get User TEC20 Courses

    GET courses20/
    
Gets all the TEC 20 courses of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/courses20

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "1210d721-def2-4753-af27-c1fbf21a7baf",
            "key": "FSC21",
            "name": "Fisica 2",
            "capacity": 30,
            "semester": "4",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "ICN"
            ],
            "typeUF": "M"
        },
        {
            "id": "dffba7b9-8ab8-4d32-a71e-da0d02fd767d",
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
            "typeUF": "B"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md