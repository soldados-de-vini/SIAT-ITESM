# Delete Group Event

    DELETE groups/:groupId/event/
    
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

    DELETE https://[HOST]/groups/b486d00e-fdbb-4c79-bed4-87339e94b488/event/
### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Event successfully deleted."
    }
}
```
