# Delete Group

    DELETE groups/:id
    
Deletes the Group with the given ID.

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

    DELETE https://[HOST]/groups/dd10ce30-d3f3-4ca9-9f15-02826eb2f720

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
