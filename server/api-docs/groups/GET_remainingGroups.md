# Get Groups Without Classroom

    GET groups/period/:periodId/remaining
    
Gets all the groups of the period where the classroom has not been assigned.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
periodId | The ID of the period that the groups belongs to.

## Example
### Request

    GET https://[HOST]/groups/period/66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee/remaining

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "ace727de-0859-41d9-8f58-329d3717a63d",
            "number": 1,
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
        {
            "id": "bd9a7114-c71f-45c3-aa7f-70aa35e06813",
            "number": 2,
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
        {
            "id": "450c85ec-c45f-4293-a7e8-77a7bebc7b74",
            "number": 3,
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
        {
            "id": "e3e9e6ef-ed63-4ce8-a57e-6ee72a866d2f",
            "number": 4,
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
        }
    ]
}
```
