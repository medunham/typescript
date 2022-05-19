# Overview

This package contains shared code with little to no dependencies that is used throughout the mono repository.

The package also contains definitions that other libs can implement and later be used for injection or dynamic execution with a common interface pattern.

A simple example might be a cache interface that is standardize but can be adapted to use with multiple node / browser ecosystem cache implementations (i.e. an abstract layer above the implementation to hide the implementation package details)

# Constraints

Dependencies for this project should be suitable to running in a browser or in a NodeJS service
