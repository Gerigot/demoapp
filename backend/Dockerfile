# syntax=docker/dockerfile:experimental
FROM openjdk:17-alpine as build
WORKDIR /workspace/app
COPY . .
RUN ./mvnw install -DskipTests

FROM openjdk:17-alpine
ENV TZ=Europe/zurich
WORKDIR /app
COPY --from=build /workspace/app/target/demo*.jar /app/demo.jar
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]