# PUT Avenue

    PUT avenues/:id
    
Updates the avenue of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
name | string | [x] | The name of the avenue.

## Example
### Request

    POST https://[HOST]/avenues/cf8f6a39-c22a-4efe-b727-a6aa21dc0ea0

#### Request Body    
```json
{
    "name": "Changed avenue"
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
        "id": "cf8f6a39-c22a-4efe-b727-a6aa21dc0ea0",
        "name": "Changed avenue"
    }
}
```
