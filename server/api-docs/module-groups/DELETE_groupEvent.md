# Delete Module Group Event

    DELETE module-groups/:groupId/event/:eventId
    
Deletes all the events of the given groupID, the professor and classroom is automatically deleted.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
groupId | The ID of the group.

## Example
### Request

    DELETE https://[HOST]/module-groups/e4fff2d9-f8dd-4954-9ed6-34d22fe78db0/event/
### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Event successfully deleted."
    }
}
```
