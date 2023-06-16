FROM golang:1.20.5-alpine3.18 AS builder

WORKDIR /go/src/fullcycle

COPY . .

RUN go mod init fullcycle
RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o fullcycle .

# RUN go build -o fullcycle

FROM scratch

WORKDIR /root/

COPY --from=builder /go/src/fullcycle/fullcycle  ./

CMD ["./fullcycle"]

#RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o fullcycle .