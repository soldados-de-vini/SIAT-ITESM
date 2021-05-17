# Delete Group Event

    DELETE groups/:groupId/event/:eventId
    
Deletes the event given the ID and the GroupID.
If there are no events left on the group, the professor and classroom is automatically deleted.

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

    DELETE https://[HOST]/groups/b486d00e-fdbb-4c79-bed4-87339e94b488/event/7b9537e0-b613-4929-aaca-f16c1be66889
### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Event successfully deleted."
    }
}
```
