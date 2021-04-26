# Delete Course21

    DELETE courses21/:id
    
Deletes the course21 with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the course to be deleted.

## Example
### Request

    DELETE https://[HOST]/courses21/4a53d76f-c4a8-41b0-b040-e226f0fb4cb0

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
