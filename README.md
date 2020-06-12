--- INICIANDO PROJETO ONG ANIMAL FINDER

    BackEnd( Node.js )

    - controllers e database
     - Users (x)
     - Animals (x)
    - adicionado replaces
    - criando as migrations de users e animals ( knex.js e sqlite3 ) (x)
    - criando seeds (x)
    - configuração do arquivo app.js (x)
    - configuração do arquivo server.js (x)
    - criando as rotas (x)

 --- Como usar --- 

    npm install -  Instalar as dependências
    npm start - Iniciar os servidores
    
    Caso queira rodar a aplicação localmente, será necessario criar um variables.env para as variaveis com as seguintes variaveis
    NODE_DEV=
    PORT=
    API_URL = 
    PATH_LOCAL = 

    STORAGE_TYPE = local || s3
    BUCKET = 

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_DEFAULT_REGION=
