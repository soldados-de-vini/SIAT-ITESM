# Delete Period

    DELETE periods/:id
    
Deletes the period with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the period to be deleted.

## Example
### Request

    DELETE https://[HOST]/periods/b2e0c568-269b-4cf4-9515-93e70fba0330

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
