# PATCH Block Group

    PATCH groups21/:id
    
Updates the block group of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the block group to be updated.

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
matricula | string | [ ] | Defines if the course must be taken for students with a certain ID.
formato | string | [ ] | The format in which the course will be taken.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    POST https://[HOST]/groups21/032a6c89-4e0d-4ef1-ae10-54477d0a7c73

#### Request Body    
```json
{
    "matricula": "TODAS",
    "formato": "PAS"
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
        "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
        "number": 1,
        "matricula": null,
        "formato": "HDPA"
    }
}
```
