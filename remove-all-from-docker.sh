#!/bin/bash

# Stop and remove all containers
echo "Removing containers :"
if [ -n "$(docker container ls -aq)" ]; then
  docker container stop $(docker container ls -aq);
  docker container rm $(docker container ls -aq);
fi;

# Remove all images
echo "Removing images :"
if [ -n "$(docker images -aq)" ]; then
  docker rmi -f $(docker images -aq);
fi;

# Remove all volumes
echo "Removing volumes :"
if [ -n "$(docker volume ls -q)" ]; then
  docker volume rm $(docker volume ls -q);
fi;

# Remove all networks
echo "Removing networks :"
# Skip default networks : bridge, host, none
if [ -n "$(docker network ls | awk '{print $1" "$2}' | grep -v 'ID\|bridge\|host\|none' | awk '{print $1}')" ]; then
  docker network rm $(docker network ls | awk '{print $1" "$2}' | grep -v 'ID\|bridge\|host\|none' | awk '{print $1}');
fi;

# Your installation should now be all fresh and clean.

# The following commands should not output any items:
# docker ps -a
# docker images -a 
# docker volume ls

# The following command show only show the default networks:
# docker network ls