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
            "startTime": "2000-01-01T13:00:00.000Z",
            "endTime": "2000-01-01T15:00:00.000Z",
            "weekDay": 4,
            "startTimeString": "13:00",
            "endTimeString": "15:00",
            "id": "58ab0552-eb35-4d08-8eff-0afa50e210db",
            "group": {
                "id": "b486d00e-fdbb-4c79-bed4-87339e94b488",
                "number": 1,
                "formato": "HDPA",
                "matricula": "TODAS",
                "course": {
                    "id": "8a4799c9-c3b4-4d21-b034-40c9cfd43704",
                    "key": "FSC1",
                    "name": "Fisica 1",
                    "capacity": 30,
                    "semester": "6",
                    "initialWeek": 6,
                    "weeks": 5,
                    "avenue": [
                        "ICN",
                        "ISC"
                    ],
                    "typeUF": "TEC20"
                },
                "classroom": {
                    "id": "d11407fb-c04f-45b1-bd19-2ea825452d1c",
                    "classroom": 237,
                    "building": "EIAD",
                    "capacity": 30,
                    "comments": null,
                    "type": "L",
                    "school": null,
                    "entrance": null,
                    "currentDiv": null,
                    "administrator": null,
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