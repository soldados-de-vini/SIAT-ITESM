# Get Module Group Events

    GET module-groups/:id/event
    
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

    GET https://[HOST]/module-groups/e4fff2d9-f8dd-4954-9ed6-34d22fe78db0/event

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Events successfully found."
    },
    "result": [
        {
            "id": "f4a8711e-5965-4c6b-a223-26e1f534ca99",
            "startTime": "15:00",
            "endTime": "17:00",
            "weekDay": 0
        },
        {
            "id": "720606f2-2674-45ea-9433-bfb1a5f45e2c",
            "startTime": "15:00",
            "endTime": "17:00",
            "weekDay": 4
        }
    ]
}
```
