A simple blog using drf for api and react for FE.

See it in action at https://www.thebookofjoel.com




### docker-compose

#### dev
docker-compose -f docker-compose.yml -f docker-compose-local.yml up -d


#### prod
if you want to run without starting mysql:
docker-compose up -d