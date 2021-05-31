# Get Professors Period Data

    GET export/professors/:userId/period/:periodId
    
Returns a CSV with all the professor assigned data of the given period.

## Parameters

### URI Parameters
Field | Description
--- | ---
userId | The ID of the user that the period belongs to.
periodId | The ID of the period that the groups belongs to.

## Example
### Request

    GET https://[HOST]/export/professors/faac7baa-b5be-49f6-9509-a99dcd4ea439/period/66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee

### Response
#### Headers
- Content-type: application/csv
- Content-Disposition: 'attachment; filename=professors.csv'
#### CSV
``` csv
nomina,nombre,area,coordinacion,email,limite_carga,udc
"14M","Evita","matemáticas","Antofagasta","l01234567@tec.mx",10.5,10
"9E","Fanny","Reto","Vilnius","l01234567@tec.mx",3.5,10

```

**Note**: The CSV already constains headers.