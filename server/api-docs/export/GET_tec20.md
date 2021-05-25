# Get Tec 20 Period Data

    GET export/tec20/:userId/period/:periodId
    
Returns a CSV with all the user assigned data of the given period.

## Parameters

### URI Parameters
Field | Description
--- | ---
userId | The ID of the user that the period belongs to.
periodId | The ID of the period that the groups belongs to.

## Example
### Request

    GET https://[HOST]/export/tec20/faac7baa-b5be-49f6-9509-a99dcd4ea439/period/66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee

### Response
``` csv
Clave,Nombre,Capacidad,Semestre,SemanaInicial,Duracion,TipoUF,Avenidas,Grupo,Formato,Matriculas,Salon,Edificio,Dia,Inicio,Fin,Nomina 1,Nombre 1,Porcentaje De Responsabilidad 1,Area 1,Coordination 1,Email 1,Nomina 2,Nombre 2,Porcentaje De Responsabilidad 2,Area 2,Coordination 2,Email 2,Nomina 3,Nombre 3,Porcentaje De Responsabilidad 3,Area 3,Coordination 3,Email 3,Nomina 4,Nombre 4,Porcentaje De Responsabilidad 4,Area 4,Coordination 4,Email 4,Nomina 5,Nombre 5,Porcentaje De Responsabilidad 5,Area 5,Coordination 5,Email 5
"MATE1","Mate1",30,"6",6,"5 semanas","TEC20","ICN ISC",5,"","",238,"EIAD","Lunes","7:00","9:00","1M","Joane",1,matemáticas,"Omsk","l01234567@tec.mx","","","","","","","","","","","","","","","","","","","","","","","",""
"FSC1","Fisica 1",30,"6",6,"5 semanas","TEC20","ICN ISC",1,"HDPA","HDPA",237,"EIAD","Viernes","13:00","15:00","1M","Joane",1,matemáticas,"Omsk","l01234567@tec.mx","","","","","","","","","","","","","","","","","","","","","","","",""
"FSC1","Fisica 1",30,"6",6,"5 semanas","TEC20","ICN ISC",2,"","",237,"EIAD","Miercoles","13:00","15:00","1M","Joane",0.5,matemáticas,"Omsk","l01234567@tec.mx","3M","Caressa",0.5,matemáticas,"Qingdao","l01234567@tec.mx","","","","","","","","","","","","","","","","","",""
"FSC1","Fisica 1",30,"6",6,"5 semanas","TEC20","ICN ISC",2,"","",237,"EIAD","Jueves","13:00","15:00","1M","Joane",0.5,matemáticas,"Omsk","l01234567@tec.mx","3M","Caressa",0.5,matemáticas,"Qingdao","l01234567@tec.mx","","","","","","","","","","","","","","","","","",""
```

**Note**: The CSV already constains headers.