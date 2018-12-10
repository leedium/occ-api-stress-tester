# occ-api-stress-tester for [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud")

Tool to help stress and load test your SSE endpoint
This helper will generate an authenticated request to an endpoint which you define.

## Dependencies
- Uses [Artillery](https://artillery.io/docs/getting-started/) which is an incredible stress/load testing suite.
Kudos to the [team](https://github.com/artilleryio/artillery) that built this.

- Uses non global instance of [occ-token-generator](https://github.com/leedium/occ-token-generator "OCC Token Generator"") (comes packaged)

* Please refer to the Artillery [documentation](https://artillery.io/docs/http-reference/ "Artillery HTTP Reference") for HTTP specific instructions.   
I incorporated the Javascript implementation for clearer understanding, and YML avoidance (lol)

## Instructions

Install Artillery (global dependency)
```
npm install -g artillery
```

Install node dependencies
```
npm i
``` 

## configuration

1. Rename `config.rename.json` to `config.json` and update the properties with values that suit your instance:
```
// config.json
{
  "occDeployServer": "{OCC ADMIN SERVER - https://ccadmin-xxx.oracleoutsourcing.com}",
  "apiKey":"{API KEY as defined in the Settings Web API Registered applications ex:  eyJKHJheh13u3yHJKHJHBK...}"
}

```

2. Update `tester.yml` with your base API endpoint and the path you want to access.

3. Include your JSON payload as a dependency in tester.js

## Start
```
 artillery run ./tester.yml
```

## Example
The given example simulates 5 order submissions to a custom payment gateway, every second for 5 minutes. 
Only credit cards (Visa, MCRD) both Normal and 3D Secure Variety are considered.

*Please change this to suit your needs as it will not work out of this box.

Artillery Test results (please see [documentation](https://artillery.io/docs/getting-started/#running-the-test) for what this all means)
```
All virtual users finished
Summary report @ 21:37:22(+0100) 2018-12-10
  Scenarios launched:  1500
  Scenarios completed: 1500
  Requests completed:  1500
  RPS sent: 4.67
  Request latency:
    min: 2490.1
    max: 25325.5
    median: 5204.6
    p95: 15653.4
    p99: 19713.7
  Scenario counts:
    0: 1500 (100%)
  Codes:
    200: 1500

```

## Credits
https://github.com/artilleryio/artillery


## Related
- Create and Deploy Server-Side Extension in Oracle Commerce Cloud
 with [occ-sse-starter](https://github.com/leedium/occ-sse-starter)   
 
- Create and test React components in Oracle Commerce Cloud with [occ-react-component](https://github.com/leedium/occ-react-component)
