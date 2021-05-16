# Get Group Events

    GET groups/:id/event
    
Gets all the events of a group.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
Id | The ID of the group.

## Example
### Request

    GET https://[HOST]/groups/b486d00e-fdbb-4c79-bed4-87339e94b488/event

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Events successfully found."
    },
    "result": [
        {
            "id": "e565832e-8589-4115-bfb1-b7fd65241b84",
            "startTime": "13:00",
            "endTime": "15:00",
            "weekDay": 4
        },
        {
            "id": "e8d3b4b4-b243-40df-9d36-d17be6b655d9",
            "startTime": "13:00",
            "endTime": "15:00",
            "weekDay": 0
        }
    ]
}
```
