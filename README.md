<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Restuarant Managment App
  
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Restuarant Managment App, bulit with NestJs, Mongodb and Redis which includes:  

- Endpoints for handling CRUD operations for (Items, Customers and Orders).
- generation of daily sales report which we can query by date, and set the limit of items count in result for `most sold items`
- Run and install the app using Docker and NPM.
- Global error handling (Exception filter) and Input validation using Class validator.
- Use of aggregation stages like $match, $group, $project to perform calculations and transformations.

## Project setup (using docker)

```bash
# change directory to project folder then first run this command to build the image
$ docker build -t restaurantnestapp:1.0 .

# list created images to get app image ID
$ docker images

# run container of the app using this image id
$ docker run -d -p 3000:3000 --name restuarnat-nest-app image-ID-here
```

## Test Project APIs

```bash
use Restaurant Nest.postman_collection.json located in the root of this repo
```

## Compile and run the project (using npm)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
