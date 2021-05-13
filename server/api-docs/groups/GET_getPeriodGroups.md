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
            "id": "8a0c9fbf-adda-4d3a-abe1-a988ba8f161a",
            "number": 1,
            "formato": "HDPA",
            "matricula": null,
            "classroom": null,
            "courseKey": "FSC1"
        },
        {
            "id": "d05ecfe4-3d1f-4555-8a03-fa1d90bddc1b",
            "number": 2,
            "formato": null,
            "matricula": null,
            "classroom": null,
            "courseKey": "FSC1"
        },
        {
            "id": "9324ff51-1b3e-4c9a-8eaa-39c356f35ae5",
            "number": 1,
            "formato": "HDPA",
            "matricula": "TODAS",
            "classroom": null,
            "courseKey": "MATE1"
        },
        {
            "id": "1c84377b-8809-4e9c-a307-31f07a35ea7c",
            "number": 2,
            "formato": null,
            "matricula": null,
            "classroom": null,
            "courseKey": "MATE1"
        },
        {
            "id": "72ea112c-151a-4cc6-9c5f-eef5ebac3eb3",
            "number": 3,
            "formato": null,
            "matricula": null,
            "classroom": null,
            "courseKey": "MATE1"
        },
        {
            "id": "9cb0d144-a0e8-43e0-b459-b49284387931",
            "number": 4,
            "formato": null,
            "matricula": null,
            "classroom": null,
            "courseKey": "MATE1"
        },
        {
            "id": "2b7adb3e-dbf9-4122-ad00-8dde6cf52d6d",
            "number": 5,
            "formato": null,
            "matricula": null,
            "classroom": null,
            "courseKey": "MATE1"
        }
    ]
}
```
