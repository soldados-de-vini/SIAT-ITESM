# Get User Courses

    GET courses/tec21
    
Gets all the courses that have typeUF equal to 'B' or 'M' of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/courses/tec21

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched course data successfully"
    },
    "result": [
        {
            "id": "a069d14c-4df0-45c1-8426-de5418e2ce2b",
            "key": "MT12",
            "name": "Mate2",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "B",
            "modules": [
                {
                    "id": "db0b5021-2da6-4254-a4cd-26387fe9940b",
                    "name": "module1"
                }
            ]
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md