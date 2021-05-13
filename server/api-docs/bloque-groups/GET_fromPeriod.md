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
            "id": "dca3f5f9-8359-4724-8087-e17a06648e07",
            "number": 1,
            "matricula": null,
            "formato": null,
            "courseKey": "MAT1B"
        },
        {
            "id": "63f304c9-5327-44b0-ae3e-c9aded9bf926",
            "number": 2,
            "matricula": null,
            "formato": null,
            "courseKey": "MAT1B"
        },
        {
            "id": "366f9329-1bdb-4253-8fb2-17354e11c2b1",
            "number": 3,
            "matricula": null,
            "formato": null,
            "courseKey": "MAT1B"
        },
        {
            "id": "e53624a3-804b-4181-a368-8b80446e867f",
            "number": 4,
            "matricula": null,
            "formato": null,
            "courseKey": "MAT1B"
        },
        {
            "id": "835fe146-4101-428e-bca5-32411d0b9eee",
            "number": 5,
            "matricula": null,
            "formato": null,
            "courseKey": "MAT1B"
        },
        {
            "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
            "number": 1,
            "matricula": null,
            "formato": null,
            "courseKey": "FSC21"
        },
        {
            "id": "50bc6e79-fa7f-4e4a-852e-1375ead1be1b",
            "number": 2,
            "matricula": null,
            "formato": null,
            "courseKey": "FSC21"
        }
    ]
}
```
