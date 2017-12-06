# FatecPinV2
API de Comunicados da Fatec Ribeirão Preto 

## Rotas Publicas
- **fatecpin.info/api/public/pins**
  - Retorna um JSon com todos os pins cadastrados
```JavaScript
{  
   "totalResults":17,
   "totalPages":2,
   "currentPage":1,
   "nextPage":"https://fatecpin.info/api/public/pins?limit=15&start=15",
   "previousPage":null,
   "pins":[  
      {  
         "id":116,
         "descricao":"Recebendo no celular",
         "data_postagem":"2017-12-01T11:43:18.000Z",
         "excluido":0,
         "admin":{  
            "id":1,
            "nome":"Lucas",
            "email":"lucas.cairesd@gmail.com"
         }
      },
      {  
         "id":115,
         "descricao":"Mexi no formulário outro formulado editado",
         "data_postagem":"2017-12-01T11:42:36.000Z",
         "excluido":0,
         "admin":{  
            "id":1,
            "nome":"Lucas",
            "email":"lucas.cairesd@gmail.com"
         }
      },
      {  
         "id":23,
         "descricao":"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         "data_postagem":"2017-11-24T02:24:48.000Z",
         "excluido":0,
         "admin":{  
            "id":1,
            "nome":"Lucas",
            "email":"lucas.cairesd@gmail.com"
         }
      },
      {  
         "id":4,
         "descricao":"Populando PINS",
         "data_postagem":"2017-11-11T00:00:00.000Z",
         "excluido":0,
         "admin":{  
            "id":7,
            "nome":"Andre",
            "email":"als.gil13@gmail.com"
         }
      },
      {...}
   ]
}
```
- **fatecpin.info/api/public/pins/{id}**
  - Retorna um Json com o pin especificado
```JavaScript
{  
   "pins":{  
      "id":23,
      "descricao":"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "data_postagem":"2017-11-24T02:24:48.000Z",
      "excluido":0,
      "admins":{  
         "id":1,
         "nome":"Lucas",
         "email":"lucas.cairesd@gmail.com"
      }
   }
}
```
- **fatecpin.info/api/public/empregos**
  - Retorna um JSon com todos os empregos cadastrados
```JavaScript
{  
   "totalResults":11,
   "totalPages":1,
   "currentPage":1,
   "nextPage":null,
   "previousPage":null,
   "empregos":[  
      {  
         "id":3,
         "titulo":"Lorem Ipsun",
         "texto":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed consectetur nisl, at rhoncus mauris. Duis ullamcorper orci id purus fermentum, vitae ornare leo viverra. Morbi eu ipsum sed sem iaculis iaculis. Praesent vestibulum egestas vulputate. Mauris in elit in velit ornare venenatis nec eu enim. Duis iaculis feugiat cursus. ",
         "data_postagem":"2017-11-11T00:00:00.000Z",
         "link_vaga":"piso.com.br/vaga",
         "admins":{  
            "id":1,
            "nome":"Lucas",
            "email":"lucas.cairesd@gmail.com"
         },
         "empresa":{  
            "id":3,
            "nome":"XPTO",
            "email":"apto@local.com.br",
            "cidade":"Ribeirão Preto",
            "estado":"SP"
         }
      },
      {  
         "id":4,
         "titulo":"Aenean ornare",
         "texto":"ligula in libero gravida, non sodales velit porttitor. Suspendisse luctus consectetur libero, sed consectetur urna. Quisque vulputate sed ante id vehicula. Curabitur eu nulla ut tortor rhoncus bibendum vitae ac tellus. Sed luctus elit enim, non tincidunt urna pretium id. ",
         "data_postagem":"2017-11-11T00:00:00.000Z",
         "link_vaga":"piso.com.br/vaga",
         "admins":{  
            "id":7,
            "nome":"Andre",
            "email":"als.gil13@gmail.com"
         },
         "empresa":{  
            "id":3,
            "nome":"XPTO",
            "email":"apto@local.com.br",
            "cidade":"Ribeirão Preto",
            "estado":"SP"
         }
      },
      {  
         "id":5,
         "titulo":"Integer convallis hendrerit viverra.",
         "texto":"Vivamus vel elit vel lectus ornare aliquam in quis tellus. Curabitur ac ipsum a libero volutpat suscipit at eget ante. Mauris non placerat metus, a mattis turpis. Duis congue placerat vulputate. Sed enim lectus, tincidunt eu dictum vel, viverra eget libero. Aenean hendrerit est eros, a bibendum sapien ultrices bibendum. Curabitur tortor urna, molestie id ex id, pellentesque iaculis neque. Nam viverra mattis ex in consectetur. Morbi libero est, efficitur sed risus eu, mollis maximus ex. Duis blandit sodales mauris sit amet lacinia. ",
         "data_postagem":"2017-11-11T00:00:00.000Z",
         "link_vaga":"lrem.ipsum@gmail.com",
         "admins":{  
            "id":7,
            "nome":"Andre",
            "email":"als.gil13@gmail.com"
         },
         "empresa":{  
            "id":5,
            "nome":"PISO",
            "email":"piso@piso.com",
            "cidade":"Ribeirão Preto",
            "estado":"SP"
         }
      },
      { ... }
   ]
}

```
- **fatecpin.info/api/public/empregos/{id}**
  - Retorna um emprego específico
```JavaScript
{  
   "emprego":{  
      "id":5,
      "titulo":"Integer convallis hendrerit viverra.",
      "texto":"Vivamus vel elit vel lectus ornare aliquam in quis tellus. Curabitur ac ipsum a libero volutpat suscipit at eget ante. Mauris non placerat metus, a mattis turpis. Duis congue placerat vulputate. Sed enim lectus, tincidunt eu dictum vel, viverra eget libero. Aenean hendrerit est eros, a bibendum sapien ultrices bibendum. Curabitur tortor urna, molestie id ex id, pellentesque iaculis neque. Nam viverra mattis ex in consectetur. Morbi libero est, efficitur sed risus eu, mollis maximus ex. Duis blandit sodales mauris sit amet lacinia. ",
      "data_postagem":"2017-11-11T00:00:00.000Z",
      "link_vaga":"lrem.ipsum@gmail.com",
      "excluido":0,
      "admins":{  
         "id":7,
         "nome":"Andre",
         "email":"als.gil13@gmail.com"
      },
      "empresa":{  
         "id":5,
         "nome":"PISO",
         "email":"piso@piso.com",
         "cidade":"Ribeirão Preto",
         "estado":"SP"
      }
   }
}
```

- fatecpin.info/api/public/eventos
- fatecpin.info/api/public/eventos/{id}
- fatecpin.info/api/public/noticias
- fatecpin.info/api/public/noticias/{id}

