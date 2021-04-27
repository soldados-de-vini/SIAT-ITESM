# Get User Groups

    GET groups/:id
    
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

    GET https://[HOST]/groups/0851274e-f1f1-4b68-a520-7545ad3f7e57

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "dd10ce30-d3f3-4ca9-9f15-02826eb2f720",
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
            "formato": "HDPA",
            "courseId": "0d14788d-c767-4fd7-bb47-04f7c0c5b4fa",
            "periodId": "0851274e-f1f1-4b68-a520-7545ad3f7e57",
            "classroom": null
        }
    ]
}
```
