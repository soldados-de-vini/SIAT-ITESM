# Delete Professor

    DELETE professors/:id
    
Deletes the professor with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the professor to be deleted.

## Example
### Request

    DELETE https://[HOST]/professors/a20c8c96-73f1-4554-8313-0ae7fab639f2

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
