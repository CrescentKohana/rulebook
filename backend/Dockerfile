FROM golang:1.16-alpine as build-stage

RUN adduser -D appuser && mkdir /home/appuser/rulebook/
WORKDIR /home/appuser/rulebook/
COPY . .

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/rulebook-backend

FROM alpine:3.14

RUN mkdir /usr/data

COPY --from=build-stage /go/bin/rulebook-backend /go/bin/rulebook-backend

EXPOSE 5050

CMD [ "sh", "-c", "go/bin/rulebook-backend ${RULES_TYPE} ${RULES_PATH}" ]
