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
eventId | The ID of the event to be deleted.

## Example
### Request

    DELETE https://[HOST]/module-groups/e4fff2d9-f8dd-4954-9ed6-34d22fe78db0/event/f4a8711e-5965-4c6b-a223-26e1f534ca99
### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Event successfully deleted."
    }
}
```
