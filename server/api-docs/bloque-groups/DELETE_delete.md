# Delete Block Group

    DELETE groups21/:id
    
Deletes the Block Group with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the group to be deleted.

## Example
### Request

    DELETE https://[HOST]/groups21/032a6c89-4e0d-4ef1-ae10-54477d0a7c73

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
