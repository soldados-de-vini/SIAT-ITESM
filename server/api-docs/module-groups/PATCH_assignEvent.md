# Patch Module Group Event

    PATCH module-groups/:id/event
    
Assigns an event given the group id. 

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the group to be updated.

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
classroomId | string | [X] | The classroom to be assigned to.
professorsIds | string[] | [X] | The id of the professors that will be part of the course.
professorsResponsability | float[] | [X] | The responsability percent of each professor. Must be the same size as professorsIds.
events | [EventInfo][] | [X] | The events to be created.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    PATCH https://[HOST]/module-groups/e4fff2d9-f8dd-4954-9ed6-34d22fe78db0/event

#### Request Body    
```json
{
    "classroomId": "d11407fb-c04f-45b1-bd19-2ea825452d1c",
    "professorsIds": ["8715bb45-e2d4-4144-975a-cd59ca8a13f2"],
    "professorsResponsability": [1],
    "events": [
        {
        "startTime": "15:00",
        "endTime": "17:00",
        "weekDay": 0
        },
        {
        "startTime": "15:00",
        "endTime": "17:00",
        "weekDay": 4
        }
    ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Event created successfully"
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
[EventInfo]: /server/api-docs/events/EventInfo.md
