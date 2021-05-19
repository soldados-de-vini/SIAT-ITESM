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
    "result": {
        "tec20": [
            {
                "id": "f1b68950-36b6-44ca-ac4d-45feef40a2e1",
                "startTime": "07:00:00",
                "startTimeString": "7:00",
                "endTime": "09:00:00",
                "endTimeString": "9:00",
                "weekDay": 0,
                "group": {
                    "id": "38f91359-183d-48d4-aa53-ce9192e82048",
                    "number": 5,
                    "formato": null,
                    "matricula": null,
                    "course": {
                        "id": "14d0e48b-1bb7-41cc-a166-6871409ed59d",
                        "key": "MATE1",
                        "name": "Mate1",
                        "capacity": 30,
                        "semester": "6",
                        "initialWeek": 6,
                        "weeks": 5,
                        "avenue": [
                            "ICN",
                            "ISC"
                        ],
                        "typeUF": "TEC20"
                    }
                },
                "professors": [
                    {
                        "id": 10,
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
            }
        ],
        "tec21": [
            {
                "id": "fe541f5b-87f1-4ee9-a041-938077d8a5e8",
                "startTime": "09:00:00",
                "startTimeString": "9:00",
                "endTime": "11:00:00",
                "endTimeString": "11:00",
                "weekDay": 0,
                "group": {
                    "id": "139fd0a2-4187-4ba2-a39f-d78eb84d13d1",
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
                        "ProfessorsToBloqueModulesId": 7,
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
            }
        ]
    }
}
```
