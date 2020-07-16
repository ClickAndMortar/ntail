# ntail

ntail is a simple CLI utility written in Node.js which reads logs from files, parses then and outputs JSON formatted data.

It is especially useful when used in Kubernetes, as a sidecar for instance, when writing logs to stdout is not possible.

ntail checks for new files matching patterns every 10 seconds.

## Usage

### Local

Create a `config.yaml` file using `config.dist.yaml` sample as a base.

```shell script
NODE_ENV=production CONFIG_PATH=/path/to/config.yaml npm start
```

### Docker

```shell script
docker pull clickandmortar/ntail
docker run \
  -v $PWD/path/to/logs:/logs \
  -v $PWD/config.yaml:/config.yaml \
  -e CONFIG_PATH=/config.yaml \
  clickandmortar/ntail
```

## Configuration

```yaml
files:
  - pattern: "/path/to/*.log"
    # Input log line sample: [2020-07-15 15:00:25] hello ntail
    format: "^\\[(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})\\] (?<message>.*)$"
    # Output raw log line if regex format does not match
    fallback: true
```

## Development

```shell script
cp config.dist.yaml config.yaml
npm install
npm dev
```

⚠️  Application currently does not restart on config file change.

## Building Docker image

```shell script
make build
make push
```

## Enhancements

- [ ] Allow adding tags in JSON output per file pattern in config
- [ ] Restart app in development mode when YAML config changes
