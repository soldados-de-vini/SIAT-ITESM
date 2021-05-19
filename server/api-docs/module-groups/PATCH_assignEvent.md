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
    "classroomId": "43d189b1-72cf-42c3-a70c-53dcc720416a",
    "professorsIds": ["8715bb45-e2d4-4144-975a-cd59ca8a13f2"],
    "professorsResponsability": [1],
    "events": [
        {
        "startTime": "9:00",
        "endTime": "11:00",
        "weekDay": 0
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
            "id": "cd9d1d15-3baf-4182-b838-f2d8ea72f5cf",
            "startTime": "9:00",
            "endTime": "11:00",
            "weekDay": 0,
            "group": {
                "id": "ea0e5da5-97c9-4c10-96cf-72ffa728d62b",
                "classroom": {
                    "id": "43d189b1-72cf-42c3-a70c-53dcc720416a",
                    "classroom": 238,
                    "building": "EIAD",
                    "capacity": 30,
                    "comments": "Cool comments",
                    "type": "L",
                    "school": "Ciencias",
                    "entrance": "B",
                    "currentDiv": "NV",
                    "administrator": "MVLKA",
                    "status": "activo"
                }
            },
            "professors": [
                {
                    "professor": {
                        "id": "8715bb45-e2d4-4144-975a-cd59ca8a13f2",
                        "nomina": "1M",
                        "name": "Joane",
                        "area": [
                            "matemáticas"
                        ],
                        "coordination": "Omsk",
                        "email": "l01234567@tec.mx",
                        "loadLimit": 14
                    },
                    "responsabilityPercent": 1
                }
            ]
        }
    ]
}
```
[EventInfo]: /server/api-docs/events/EventInfo.md
