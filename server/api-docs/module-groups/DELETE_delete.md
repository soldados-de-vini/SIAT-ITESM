# Delete Module Group

    DELETE module-groups/:id
    
Deletes the Module Group with the given ID.

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

    DELETE https://[HOST]/module-groups/f59609cf-a99d-498c-afda-f50f4dc59327

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
