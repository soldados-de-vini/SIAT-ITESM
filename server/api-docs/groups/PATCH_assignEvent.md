# Patch Group

    PATCH groups/:id/event
    
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

    PATCH https://[HOST]/groups/b486d00e-fdbb-4c79-bed4-87339e94b488/event

#### Request Body    
```json
{
    "classroomId": "d11407fb-c04f-45b1-bd19-2ea825452d1c",
    "professorsIds": ["8715bb45-e2d4-4144-975a-cd59ca8a13f2"],
    "professorsResponsability": [1],
    "events": [
        {
        "startTime": "13:00",
        "endTime": "15:00",
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
            "id": "e565832e-8589-4115-bfb1-b7fd65241b84",
            "startTime": "13:00",
            "endTime": "15:00",
            "weekDay": 4
        }
    ]
}
```
[EventInfo]: /server/api-docs/events/EventInfo.md