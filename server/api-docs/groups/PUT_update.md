# Put Group

    PUT groups/:id
    
Updates the group of the given ID.

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
number | int | [x] | The number of the group.
startDate | string | [x] | The start date of the period.
endDate | string | [x] | The end date of the period.
matricula | string | [x] | Defines if the course must be taken for students with a certain ID.
formato | string | [x] | The format in which the course will be taken.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    PUT https://[HOST]/groups/dd10ce30-d3f3-4ca9-9f15-02826eb2f720

#### Request Body    
```json
{
    "number": 1,
    "startDate": "2021-07-26",
    "endDate": "2021-08-28",
    "matricula": "TODOS",
    "formato": "NSD"
}

```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Updated successfully."
    },
    "result": {
        "id": "dd10ce30-d3f3-4ca9-9f15-02826eb2f720",
        "number": 1,
        "startDate": "2021-07-26",
        "endDate": "2021-08-28",
        "matricula": "TODOS",
        "formato": "NSD",
        "courseId": "0d14788d-c767-4fd7-bb47-04f7c0c5b4fa",
        "periodId": "0851274e-f1f1-4b68-a520-7545ad3f7e57",
        "classroom": null
    }
}
```
