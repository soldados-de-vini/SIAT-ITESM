# Get User Modules

    GET modules/
    
Gets all the modules of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/modules

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "6097eb7e-7740-41d8-9730-87a54beb539c",
            "name": "module1"
        },
        {
            "id": "ada93ca5-41ea-49d2-a402-e9452cdc3822",
            "name": "module2"
        }
    ]
}
```

[CourseInfo]: /server/api-docs/courses/CourseInfo.md