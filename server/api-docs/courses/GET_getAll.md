# Get User Courses

    GET courses/
    
Gets all the courses of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/courses

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user courses successfully."
    },
    "result": [
        {
            "id": "4a53d76f-c4a8-41b0-b040-e226f0fb4cb0",
            "key": "MT1",
            "name": "Mate1",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "TEC21"
        },
        {
            "id": "f8e86d7d-a36a-49a4-bf56-f596ad258ec5",
            "key": "MT12",
            "name": "Mate2",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "TEC21"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md