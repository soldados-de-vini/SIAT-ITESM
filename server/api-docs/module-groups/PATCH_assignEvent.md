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
    "professorsIds": ["6949889b-7203-489c-88d4-378152a5ba90"],
    "professorsResponsability": [1],
    "events": [
        {
        "startTime": "11:00",
        "endTime": "13:00",
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
            "startTime": "2000-01-01T11:00:00.000Z",
            "endTime": "2000-01-01T13:00:00.000Z",
            "weekDay": 0,
            "startTimeString": "11:00",
            "endTimeString": "13:00",
            "id": "c37ba29f-ca95-4935-bbef-d8c679c271e9",
            "group": {
                "id": "0b9ec4f5-5970-4af9-bbcb-9790f2da579f",
                "group": {
                    "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
                    "number": 1,
                    "matricula": null,
                    "formato": "HDPA",
                    "course21": {
                        "id": "a395d93d-5d72-472b-930a-c0d79961c54c",
                        "key": "FSC21",
                        "name": "Fisica 2",
                        "capacity": 30,
                        "semester": "4",
                        "initialWeek": 6,
                        "weeks": 10,
                        "avenue": [
                            "ICN"
                        ],
                        "typeUF": "M"
                    }
                },
                "module": {
                    "id": "bc8983d5-c8ab-4781-9719-6c25e22d077e",
                    "name": "module1"
                },
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
                        "id": "6949889b-7203-489c-88d4-378152a5ba90",
                        "nomina": "2M",
                        "name": "Candi",
                        "area": [
                            "matemáticas"
                        ],
                        "coordination": "Chongqing",
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
