# Get Classrooms Groups

    GET classrooms/:classroomId/period/:periodId/events

Gets all the groups of a classroom in a certain period.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
classroomId | The ID of classroom.
periodId | The ID of the period.

## Example
### Request

    GET https://[HOST]/classrooms/d11407fb-c04f-45b1-bd19-2ea825452d1c/period/66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee/events

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successfully fetched data."
    },
    "result": [
        {
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
            "events": [
                {
                    "id": "9aa54591-8dd0-43ff-bed4-921fb0372cf0",
                    "startTime": "13:00:00",
                    "startTimeString": "13:00",
                    "endTime": "15:00:00",
                    "endTimeString": "15:00",
                    "weekDay": 0
                },
                {
                    "id": "5330d66e-b090-486d-bad2-3f57cad8226b",
                    "startTime": "13:00:00",
                    "startTimeString": "13:00",
                    "endTime": "15:00:00",
                    "endTimeString": "15:00",
                    "weekDay": 4
                }
            ],
            "professors": [
                {
                    "id": 4,
                    "responsabilityPercent": 1,
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
                    }
                }
            ]
        },
        {
            "id": "eddd6734-f9a3-4eee-9e8e-dde67cfd7332",
            "number": 2,
            "formato": null,
            "matricula": null,
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
            "events": [
                {
                    "id": "5f38151f-1a8c-4402-89a3-98fcec587b86",
                    "startTime": "13:00:00",
                    "startTimeString": "13:00",
                    "endTime": "15:00:00",
                    "endTimeString": "15:00",
                    "weekDay": 2
                },
                {
                    "id": "4431ab5f-7109-4a70-af15-f25bd4873dab",
                    "startTime": "13:00:00",
                    "startTimeString": "13:00",
                    "endTime": "15:00:00",
                    "endTimeString": "15:00",
                    "weekDay": 3
                }
            ],
            "professors": [
                {
                    "id": 6,
                    "responsabilityPercent": 0.5,
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
                    }
                },
                {
                    "id": 5,
                    "responsabilityPercent": 0.5,
                    "professor": {
                        "id": "4e8fcb5a-899a-4cf0-aa38-f53e70d21ea4",
                        "nomina": "3M",
                        "name": "Caressa",
                        "area": [
                            "matemáticas"
                        ],
                        "coordination": "Qingdao",
                        "email": "l01234567@tec.mx",
                        "loadLimit": 14
                    }
                }
            ]
        }
    ]
}
```
