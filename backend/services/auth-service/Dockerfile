FROM openjdk:21-jdk

WORKDIR /app

COPY target/auth-service-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

CMD ["sh", "-c", "sleep 5 && java -jar auth-service-0.0.1-SNAPSHOT.jar"]
