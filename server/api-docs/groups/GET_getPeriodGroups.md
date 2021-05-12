# Get User Groups

    GET groups/period/:id
    
Gets all the groups of the period ID requested.

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

    GET https://[HOST]/groups/period/b7126849-a3de-4b40-8c1f-61e79e65ec9a

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
                "id": "0d14788d-c767-4fd7-bb47-04f7c0c5b4fa",
                "key": "FSC22",
                "name": "Fisica 3",
                "capacity": 30,
                "semester": "6",
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
                    "id": "c6d4b1ca-f6e6-40de-8954-284013e806f5",
                    "number": 1,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "03bb784b-86f5-4f32-a27b-d9a5a52bab73",
                    "number": 2,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "e70836dc-7b81-41bb-afff-64980f928ac3",
                    "number": 3,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "b2741448-8d62-4927-bcc7-ba3020f03d1f",
                    "number": 4,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                }
            ]
        },
        {
            "course": {
                "id": "0125a974-baef-45fa-bd4a-60f3ed2a3195",
                "key": "MAT1",
                "name": "Mate 1",
                "capacity": 30,
                "semester": "4",
                "initialWeek": 6,
                "weeks": 5,
                "avenue": [
                    "ICN",
                    "ISC"
                ],
                "typeUF": "TEC20"
            },
            "groups": [
                {
                    "id": "4bbd9ad8-5906-48de-99e9-56d28e7c026c",
                    "number": 1,
                    "formato": "HDPA",
                    "matricula": "TODAS",
                    "classroom": null
                },
                {
                    "id": "ee5b4667-e88f-4ce6-aeee-4774f37ee1b1",
                    "number": 2,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "68b3870d-2e09-494c-aeeb-287090ef11af",
                    "number": 3,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "7332c522-9733-4212-b8fb-4e4d4ade8feb",
                    "number": 4,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "084c379a-7b42-4697-bd37-da2c47c338a3",
                    "number": 5,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                },
                {
                    "id": "09dca748-eaa2-4437-8189-d6b62a05755c",
                    "number": 6,
                    "formato": null,
                    "matricula": null,
                    "classroom": null
                }
            ]
        }
    ]
}
```
