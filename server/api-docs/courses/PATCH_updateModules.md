# PATCH Course

    PATCH courses/:id
    
Updates the course of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
modules | string[] | [x] | The set of modules that are going to be added to the course.

## Example
### Request

    POST https://[HOST]/courses/c9070e2e-0464-49b6-ae43-30d6f5a0c639

#### Request Body    
```json
{
    "modules": [
        "fe33c0d5-c6ef-437c-aa05-90cf4f0138fb"
    ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Modules successfully added."
    },
    "result": {
        "id": "c9070e2e-0464-49b6-ae43-30d6f5a0c639",
        "key": "MT1",
        "name": "Mate1",
        "capacity": 30,
        "semester": "TEC20",
        "initialWeek": 6,
        "weeks": 10,
        "avenue": [
            "IIC"
        ],
        "typeUF": "TEC21",
        "modules": [
            {
                "id": "fe33c0d5-c6ef-437c-aa05-90cf4f0138fb",
                "name": "module2"
            }
        ]
    }
}
```
