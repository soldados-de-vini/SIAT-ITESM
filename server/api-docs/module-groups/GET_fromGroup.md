# Get Module Groups

    GET module-groups/:id
    
Gets all the module groups of the group 21 requested.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the group 21 that the module group belong to.

## Example
### Request

    GET https://[HOST]/module-groups/d7b6ce63-683b-4c7b-93af-89a2d376f0e2

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched successfully"
    },
    "result": [
        {
            "id": "f59609cf-a99d-498c-afda-f50f4dc59327",
            "module": {
                "id": "bc8983d5-c8ab-4781-9719-6c25e22d077e",
                "name": "module1"
            }
        },
        {
            "id": "60fde8ef-2861-4d02-8f6f-f4d006251f60",
            "module": {
                "id": "9c211296-eb21-413b-9035-47899c1b2da2",
                "name": "module2"
            }
        }
    ]
}
```
