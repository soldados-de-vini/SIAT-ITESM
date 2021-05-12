# Get Period Block Groups

    GET groups21/period/:id
    
Gets all the block groups of the period ID requested.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the period that the groups belong to.

## Example
### Request

    GET https://[HOST]/groups21/period/b7126849-a3de-4b40-8c1f-61e79e65ec9a

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "course": {
                "id": "bac5fcc4-ffc1-47bd-8015-4c8a8d82591e",
                "key": "MAT1B",
                "name": "Mate en la ingenieria",
                "capacity": 30,
                "semester": "4",
                "initialWeek": 6,
                "weeks": 5,
                "avenue": [
                    "ICN",
                    "ISC"
                ],
                "typeUF": "B"
            },
            "groups": [
                {
                    "id": "59517554-fdb2-486c-8480-fde3239dc452",
                    "number": 1,
                    "matricula": null,
                    "formato": null
                },
                {
                    "id": "e89d8d0b-6f73-4850-8d22-ed2769e52ef3",
                    "number": 2,
                    "matricula": null,
                    "formato": null
                },
                {
                    "id": "765ed38b-8376-4828-9ab7-778eae107b55",
                    "number": 3,
                    "matricula": null,
                    "formato": null
                },
                {
                    "id": "80c0436d-d2c5-4ba9-8ca4-11dc7161d574",
                    "number": 4,
                    "matricula": null,
                    "formato": null
                },
                {
                    "id": "f832d8e3-287a-4a2a-9f1f-cbfb1a4b7e67",
                    "number": 5,
                    "matricula": null,
                    "formato": null
                }
            ]
        },
        {
            "course": {
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
            },
            "groups": [
                {
                    "id": "d517cdc8-4c26-4914-8ab4-e29bd26c635f",
                    "number": 1,
                    "matricula": null,
                    "formato": null
                },
                {
                    "id": "c0175093-61eb-4180-b7b5-82d2b7779db1",
                    "number": 2,
                    "matricula": null,
                    "formato": null
                }
            ]
        }
    ]
}
```
