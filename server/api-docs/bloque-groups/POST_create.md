# Create Block Group

    POST groups21/
    
Creates a new set of Block Groups for the user requesting it on a Period ([PeriodInfo]).

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
periodId | string | [X] | The UUID of the period where the group will be created.
groups | [GroupCreate][] | [X] | The data of the groups to be added.

## Example
### Request

    POST https://[HOST]/groups21/

#### Request Body    
```json
{
    "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a",
    "groups": [
        {
            "groupsAmount": 2,
            "courseKey": "FSC21"
        },
        {
            "groupsAmount": 5,
            "courseKey": "MAT1B"
        }
    ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Created successfully."
    },
    "result": [
        {
            "courseKey": "FSC21",
            "groups": [
                {
                    "number": 1,
                    "matricula": null,
                    "formato": null,
                    "id": "d517cdc8-4c26-4914-8ab4-e29bd26c635f"
                },
                {
                    "number": 2,
                    "matricula": null,
                    "formato": null,
                    "id": "c0175093-61eb-4180-b7b5-82d2b7779db1"
                }
            ]
        },
        {
            "courseKey": "MAT1B",
            "groups": [
                {
                    "number": 1,
                    "matricula": null,
                    "formato": null,
                    "id": "59517554-fdb2-486c-8480-fde3239dc452"
                },
                {
                    "number": 2,
                    "matricula": null,
                    "formato": null,
                    "id": "e89d8d0b-6f73-4850-8d22-ed2769e52ef3"
                },
                {
                    "number": 3,
                    "matricula": null,
                    "formato": null,
                    "id": "765ed38b-8376-4828-9ab7-778eae107b55"
                },
                {
                    "number": 4,
                    "matricula": null,
                    "formato": null,
                    "id": "80c0436d-d2c5-4ba9-8ca4-11dc7161d574"
                },
                {
                    "number": 5,
                    "matricula": null,
                    "formato": null,
                    "id": "f832d8e3-287a-4a2a-9f1f-cbfb1a4b7e67"
                }
            ]
        }
    ]
}
```

[GroupCreate]: /server/api-docs/groups/GroupCreate.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
