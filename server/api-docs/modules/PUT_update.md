# PUT Module

    PUT modules/:id
    
Updates the module of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
name | string | [x] | The name of the module.

## Example
### Request

    POST https://[HOST]/modules/6097eb7e-7740-41d8-9730-87a54beb539c

#### Request Body    
```json
{
    "name": "Changed module"
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
        "id": "6097eb7e-7740-41d8-9730-87a54beb539c",
        "name": "Changed module"
    }
}
```
