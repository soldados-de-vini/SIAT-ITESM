# Create Module

    POST Module/
    
Creates a new set of Modules for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
modules | [ModuleInfo][] | [X] | The set of modules to be created.

## Example
### Request

    POST https://[HOST]/modules

#### Request Body    
```json
{
    "modules": [
        {
            "name": "module1"
        },
        {
            "name": "module2"
        }
    ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Created successfully."
    },
    "result": [
        {
            "name": "module1",
            "id": "6097eb7e-7740-41d8-9730-87a54beb539c"
        },
        {
            "name": "module2",
            "id": "ada93ca5-41ea-49d2-a402-e9452cdc3822"
        }
    ]
}
```

[ModuleInfo]: /server/api-docs/modules/ModuleInfo.md