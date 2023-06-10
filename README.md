<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2>PERN Dockerized Stack</h2>
  <br />

[![PostgreSQL][PostgreSQL]][PostgreSQL-url]
[![Express][Express]][Express-url]
[![React][React.js]][React-url]
[![Nodejs][Node.js]][Node-url]
[![Docker][Docker]][Docker-url]

  <p>
    <br />
    <a href="https://github.com/adefrutoscasado/pern-dockerized-stack/issues">Report Bug</a>
    ·
    <a href="https://github.com/adefrutoscasado/pern-dockerized-stack/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project implements the main features to deploy a PERN stack application.

- No `create-react-app` clones. A minimal webpack config is provided. No hacks to configure!
- Development hot reload for both backend and frontend.
- Node modules managed entirely by docker. Package version integrity across developers and environments. Including IDE access to node modules.
- Docker versioning for easy deploys and rollbacks.
- Endpoint and docker volume to upload files.
- Database migrations (Optional).

<!-- VARIANTS -->
## Variants

Want even more boilerplate code? Try following variant:

- [Version including `prisma`](https://github.com/adefrutoscasado/pern-dockerized-stack/tree/prisma)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You must have following software installed in your System:
- `docker`
- `docker-compose`



### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/adefrutoscasado/pern-dockerized-stack.git
    ```
2. Start the container:
    ```sh
    cd pern-dockerized-stack/docker
    docker-compose -f docker-compose-dev.yml up
    ```
    Or, to keep logs separate, start each service individually in different terminals:

    ```sh
    cd pern-dockerized-stack/docker
    docker-compose -f docker-compose-dev.yml up database
    docker-compose -f docker-compose-dev.yml up backend
    docker-compose -f docker-compose-dev.yml up frontend
    ```
    Frontend will be served at [localhost:3010](localhost:3010)


<!-- USAGE EXAMPLES -->
## Usage

<details>
  <summary>Installing a package</summary>
  <ol>
  <br />

  In order to share a similar environment across team, packages are managed inside the container. This is important, since different machines, node versions or packages can behave differently. Never execute `npm install package` by yourself, since it would be running under your local node installation. Instead, add the package to the `package.json` and then run:

  ```bash
  docker-compose -f docker-compose-dev.yml build backend
  # or
  docker-compose -f docker-compose-dev.yml build frontend
  ```

  After this, starting the containuer will dump the updated node modules to your local machine, so your IDE will be able to access it.

  <br />
  </ol>
</details>

<details>
  <summary>Erasing all data (uploads folder and database data)</summary>
  <ol>
  <br />

  To reset all volumes completely use following command (**data will be lost**):
  ```
  docker-compose -f docker-compose-dev.yml down -v
  ```

  <br />
  </ol>
</details>

<details>
  <summary>Erasing uploads folder</summary>
  <ol>
  <br />

  List all volumes using:

  ```bash
  docker volume ls
  ```
  Remove the specified volume using:
  ```bash
  docker volume rm docker_backend-uploads
  ```

  <br />
  </ol>
</details>

<details>
  <summary>Erasing database data</summary>
  <ol>
  <br />

  List all volumes using:

  ```bash
  docker volume ls
  ```
  Remove the specified volume using:

  ```bash
  docker volume rm docker_database-data
  ```

  <br />
  </ol>
</details>

<details>
  <summary>Log management</summary>
  <ol>
  <br />

  Logs can take up a lot of space on a server's hard drive, which can result in a lack of available space for other important files. By limiting the size of the logs, you can ensure that enough space is available for the necessary files. Following configuration at `docker/docker-compose-prod.yml` sets a maximum of 5 log files with a max size of 10 Mb each. So at most 50 Mb of logs for that container. Tune those numbers as you see fit.

  ```yaml
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "5"
  ```

  <br />
  </ol>
</details>

<details>
  <summary>Migrations</summary>
  <ol>
  <br />

  Migrations are optional. If you prefer to manage dabatase changes manually, just ignore this part.
  Migrations are configured at `backend/database/migrations` and are managed by [Knex](https://knexjs.org/guide/migrations.html). Two disabled files are included as example. To create a migration, just create a new file using `<filename>.js`. The order of execution of migrations is defined by the filename.

  <br />
  </ol>
</details>

<details>
  <summary>Installing docker `buildx` plugin to push images to different machine architectures</summary>
  <ol>
  <br />

  Download `buildx` binaries for your development local machine:
  [https://github.com/docker/buildx/releases](https://github.com/docker/buildx/releases)

  Rename the binary to `docker-buildx` and move the binary file to `~/.docker/cli-plugins/docker-buildx`. Give permissions to execute:

  ```bash
  chmod +x ~/.docker/cli-plugins/docker-buildx
  ```

  Install following needed packages:

  ```bash
  sudo apt install -y qemu-user-static binfmt-support
  ```

  <br />
  </ol>
</details>

<details>
  <summary>Pulling changes from original repository</summary>
  <ol>
  <br />

  Once you cloned this repository, you can still pull changes from original repository using following steps:

  ```bash
  git remote add upstream git@github.com:adefrutoscasado/pern-dockerized-stack.git
  ```
  ```bash
  git pull upstream main
  ```

  <br />
  </ol>
</details>

<!-- ROADMAP -->
## Roadmap

- &#x2611; Backend
  - &#x2611; Hot reload at development
  - &#x2611; Package version integrity
  - &#x2611; Production docker compose
  - &#x2611; Database migrations
  - &#x2611; Create upload file endpoint
  - &#x2611; Log management
- &#x2611; Frontend
  - &#x2611; Hot reload at development
  - &#x2611; Package version integrity
  - &#x2611; Production docker compose
- &#x2610; Docker registry instructions (Docker versioning)
- &#x2610; Usage instructions

See the [open issues](https://github.com/adefrutoscasado/pern-dockerized-stack/issues) for a full list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/adefrutoscasado/pern-dockerized-stack](https://github.com/adefrutoscasado/pern-dockerized-stack)



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []() -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/adefrutoscasado/pern-dockerized-stack.svg?style=for-the-badge
[contributors-url]: https://github.com/adefrutoscasado/pern-dockerized-stack/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/adefrutoscasado/pern-dockerized-stack.svg?style=for-the-badge
[forks-url]: https://github.com/adefrutoscasado/pern-dockerized-stack/network/members

[stars-shield]: https://img.shields.io/github/stars/adefrutoscasado/pern-dockerized-stack.svg?style=for-the-badge
[stars-url]: https://github.com/adefrutoscasado/pern-dockerized-stack/stargazers

[issues-shield]: https://img.shields.io/github/issues/adefrutoscasado/pern-dockerized-stack.svg?style=for-the-badge
[issues-url]: https://github.com/adefrutoscasado/pern-dockerized-stack/issues

[license-shield]: https://img.shields.io/github/license/adefrutoscasado/pern-dockerized-stack.svg?style=for-the-badge
[license-url]: https://github.com/adefrutoscasado/pern-dockerized-stack/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[PostgreSQL]: https://img.shields.io/badge/postgresql-336690.svg?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org//

[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Express]: https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/