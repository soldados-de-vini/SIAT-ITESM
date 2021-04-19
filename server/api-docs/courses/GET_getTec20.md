# Get User TEC20 Courses

    GET courses/tec20
    
Gets all the courses that have typeUF equal to 'TEC20' of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/courses/tec20

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched course data successfully"
    },
    "result": [
        {
            "id": "eaaa74ff-6574-4f15-824e-b9d3f3a6fc03",
            "key": "MT1",
            "name": "Mate1",
            "capacity": 30,
            "semester": "TEC20",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "TEC20"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md