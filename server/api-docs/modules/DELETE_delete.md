# Delete Module

    DELETE modules/:id
    
Deletes the module with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the module to be deleted.

## Example
### Request

    DELETE https://[HOST]/modules/6097eb7e-7740-41d8-9730-87a54beb539c

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
