# Dockerfile for the API


FROM openjdk:17-jdk-slim
COPY target/api.jar api.jar
ENTRYPOINT ["java", "-jar", "/api.jar"]
