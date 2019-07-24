A simple blog using drf for api and react for FE.

See it in action at https://www.thebookofjoel.com


### Running locally

to run postgres and redis locally
 
`docker-compose -f docker-compose.yml -f docker-compose-local.yml up -d`

start backend

`python manage.py runserver 8081`

start frontend

`npm run start` or `npm run watch`
