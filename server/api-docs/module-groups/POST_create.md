# Create a Module Group

    POST module-groups/
    
Creates a new module group assigned to a Group 21 ([Group21Info]).

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
groupId | string | [X] | The UUID of the group that has group.
moduleId | string | [X] | The UUID of the module that is part of the group to be matched with this group.

## Example
### Request

    POST https://[HOST]/module-groups/

#### Request Body    
```json
{
    "moduleId": [
        "9c211296-eb21-413b-9035-47899c1b2da2",
        "bc8983d5-c8ab-4781-9719-6c25e22d077e"
    ],
    "groupId": "d7b6ce63-683b-4c7b-93af-89a2d376f0e2"
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Created sucessfully."
    },
    "result": {
        "groups": [
            {
                "module": {
                    "id": "bc8983d5-c8ab-4781-9719-6c25e22d077e",
                    "name": "module1"
                },
                "id": "d8130216-e19a-484b-9c71-015a7cae7130"
            },
            {
                "module": {
                    "id": "9c211296-eb21-413b-9035-47899c1b2da2",
                    "name": "module2"
                },
                "id": "adefd79b-96c7-4fca-9b7d-d80ca4497420"
            }
        ],
        "groupId": "d7b6ce63-683b-4c7b-93af-89a2d376f0e2"
    }
}
```

[Group21Info]: /server/api-docs/bloque-groups/Group21Info.md