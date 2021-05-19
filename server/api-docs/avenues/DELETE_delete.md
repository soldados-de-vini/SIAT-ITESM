# Delete Avenues

    DELETE avenues/:id
    
Deletes the avenue with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the avenue to be deleted.

## Example
### Request

    DELETE https://[HOST]/avenue/92b9a748-9752-45df-87d1-539da2b87688

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
