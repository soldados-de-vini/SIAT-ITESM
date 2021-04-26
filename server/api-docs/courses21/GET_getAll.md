# Get User Courses21

    GET courses21/
    
Gets all the courses21 of the user.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/courses21/

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "92291ec4-b7cb-444f-aa96-9016323a2575",
            "key": "MT12",
            "name": "Mate2",
            "capacity": 30,
            "semester": "4",
            "initialWeek": 6,
            "weeks": 10,
            "avenue": [
                "IIC"
            ],
            "typeUF": "B",
            "modules": [
                {
                    "id": "266b2fd8-61e4-4b65-be24-8c09f69fd5ea",
                    "name": "module1"
                }
            ]
        },
        {
            "id": "ab51153c-3aa5-4991-a072-966dbccf1ca3",
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
            ]
        }
    ]
}
```
