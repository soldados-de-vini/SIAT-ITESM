# PATCH Block Group

    PATCH groups21/:id
    
Updates the block group of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the block group to be updated.

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
number | string | [x] | The number of the course.
startDate | string | [x] | The start date of the period.
endDate | string | [x] | The end date of the period.
matricula | string | [ ] | Defines if the course must be taken for students with a certain ID.
formato | string | [ ] | The format in which the course will be taken.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    POST https://[HOST]/groups21/032a6c89-4e0d-4ef1-ae10-54477d0a7c73

#### Request Body    
```json
{
    "number": 2,
    "startDate": "2021-07-26",
    "endDate": "2021-08-28",
    "matricula": "TODAS",
    "formato": "PAS"
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
        "id": "032a6c89-4e0d-4ef1-ae10-54477d0a7c73",
        "number": 2,
        "startDate": "2021-07-26",
        "endDate": "2021-08-28",
        "matricula": "TODAS",
        "formato": "PAS",
        "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
        "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a"
    }
}
```
