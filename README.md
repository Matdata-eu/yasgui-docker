# Docker container for Yasgui

A docker image to setup a simple website with Yasgui.

## Description

This project implements a docker container for Yasgui, "Yet another SPARQL GUI". The docker container runs a react nodejs application that shows a Yasgui interface on the webpage. The flavor of Yasgui is based on the [Matdata version](https://github.com/Matdata-eu/Yasgui).

## Usage

A docker image is available on [Dockerhub](https://hub.docker.com/r/mathiasvda/yasgui)

Example usage:

```sh
$ docker run -p 8080:8080 mathiasvda/yasgui
```

## Configuration

You can use the environmental variable `YASGUI_DEFAULT_ENDPOINT` to set the default endpoint:

```sh
$ docker run -p 8080:8080 -e YASGUI_DEFAULT_ENDPOINT="https://jena.matdata.eu/expertise/query" mathiasvda/yasgui
```

## LICENSE

See LICENSE.md
