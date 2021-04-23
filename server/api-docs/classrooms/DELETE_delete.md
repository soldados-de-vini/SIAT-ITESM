# Delete Classroom

    DELETE classrooms/:id
    
Deletes the classroom with the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the classroom to be deleted.

## Example
### Request

    DELETE https://[HOST]/classrooms/57be0e16-4235-49fb-82b8-c67483da2686

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully deleted."
    }
}
```
