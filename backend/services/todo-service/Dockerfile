FROM openjdk:21-jdk

WORKDIR /app

COPY target/todo-service-0.0.1-SNAPSHOT.jar .

EXPOSE 8081

CMD ["sh", "-c", "sleep 5 && java -jar todo-service-0.0.1-SNAPSHOT.jar"]