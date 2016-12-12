# Dredd Test Results

This is the object that Dredd returns after running a test suite.

```
[
  {
    "status": "fail",
    "title": "POST /0/accounts/99/users",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '201'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{account_id}/users",
      "actionName": "Invite an user and/or associate it with the account",
      "exampleName": "201 > application/json; charset=utf-8"
    },
    "startedAt": 1481563442701,
    "start": "2016-12-12T17:24:02.701Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:02 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": {\n    \"id\": -40816918,\n    \"firstname\": \"in Ut\",\n    \"lastname\": \"Duis cupidatat sunt minim\",\n    \"email\": \"adipisicing ut non esse minim\"\n  }\n}",
      "statusCode": "201",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"firstname\",\"lastname\",\"email\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"firstname\":{\"type\":\"string\",\"example\":\"John\"},\"lastname\":{\"type\":\"string\",\"example\":\"Smith\"},\"email\":{\"type\":\"string\",\"example\":\"john.smith@example.com\"}}}}}"
    },
    "request": {
      "method": "POST",
      "uri": "/0/accounts/99/users",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL",
        "Content-Length": 109
      },
      "body": "{\n  \"email\": \"amet sit sunt\",\n  \"firstname\": \"nulla in culpa non elit\",\n  \"lastname\": \"eiusmod in proident\"\n}"
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-4\n+2\n 01\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '201'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:02.923Z",
    "duration": 222
  },
  {
    "status": "fail",
    "title": "POST /0/accounts/99/users",
    "message": "body: Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'\nstatusCode: Status code is not '204'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{account_id}/users",
      "actionName": "Invite an user and/or associate it with the account",
      "exampleName": "204 > application/json; charset=utf-8"
    },
    "startedAt": 1481563442923,
    "start": "2016-12-12T17:24:02.924Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:02 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "POST",
      "uri": "/0/accounts/99/users",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL",
        "Content-Length": 123
      },
      "body": "{\n  \"email\": \"exercitation enim d\",\n  \"firstname\": \"nostrud dolore fugiat eu tempor\",\n  \"lastname\": \"sint aliqua nostrud\"\n}"
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "message": "Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'",
            "severity": "error"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": null,
        "validator": null,
        "rawData": null
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+204\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '204'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:02.993Z",
    "duration": 69
  },
  {
    "status": "pass",
    "title": "GET /0/ping",
    "message": "",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "meta",
      "resourceName": "/0/ping",
      "actionName": "GET",
      "exampleName": "204"
    },
    "startedAt": 1481563442993,
    "start": "2016-12-12T17:24:02.993Z",
    "actual": {
      "statusCode": 204,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": ""
    },
    "expected": {
      "headers": {},
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "GET",
      "uri": "/0/ping",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [],
        "realType": "text/plain",
        "expectedType": "text/plain",
        "validator": "TextDiff",
        "rawData": ""
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "",
        "results": []
      }
    },
    "valid": true,
    "end": "2016-12-12T17:24:03.069Z",
    "duration": 76
  },
  {
    "status": "fail",
    "title": "GET /0/me",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '200'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "users",
      "resourceName": "/0/me",
      "actionName": "Find yourself",
      "exampleName": "200 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443070,
    "start": "2016-12-12T17:24:03.070Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": {\n    \"id\": -2899019,\n    \"firstname\": \"eiusmod\",\n    \"lastname\": \"Excepteur est\",\n    \"email\": \"esse\",\n    \"accounts\": [\n      {\n        \"id\": -67821232,\n        \"name\": \"et velit sint aute\"\n      },\n      {\n        \"id\": -20856091,\n        \"name\": \"amet irure e\"\n      },\n      {\n        \"id\": 92046436,\n        \"name\": \"in minim ex dolor\"\n      }\n    ]\n  }\n}",
      "statusCode": "200",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"firstname\",\"lastname\",\"email\",\"accounts\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"firstname\":{\"type\":\"string\",\"example\":\"John\"},\"lastname\":{\"type\":\"string\",\"example\":\"Smith\"},\"email\":{\"type\":\"string\",\"example\":\"john.smith@example.com\"},\"accounts\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"name\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"name\":{\"type\":\"string\",\"example\":\"AccountName\"}}}}}}}}"
    },
    "request": {
      "method": "GET",
      "uri": "/0/me",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+200\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '200'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.159Z",
    "duration": 89
  },
  {
    "status": "fail",
    "title": "GET /0/accounts/99/users?limit=10",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '200'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{account_id}/users",
      "actionName": "Find users associated with the account",
      "exampleName": "200 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443165,
    "start": "2016-12-12T17:24:03.165Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": [\n    {\n      \"id\": 92270440,\n      \"firstname\": \"dol\",\n      \"lastname\": \"ex proident\",\n      \"email\": \"ea cupidatat amet eu\"\n    },\n    {\n      \"id\": 72866764,\n      \"firstname\": \"proident\",\n      \"lastname\": \"in\",\n      \"email\": \"Lorem minim ex\"\n    },\n    {\n      \"id\": -53367520,\n      \"firstname\": \"dolore ut\",\n      \"lastname\": \"dolor ut enim\",\n      \"email\": \"aute elit minim in\"\n    },\n    {\n      \"id\": -63363753,\n      \"firstname\": \"veniam ut\",\n      \"lastname\": \"in quis est dolor aute\",\n      \"email\": \"nulla\"\n    }\n  ]\n}",
      "statusCode": "200",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"firstname\",\"lastname\",\"email\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"firstname\":{\"type\":\"string\",\"example\":\"John\"},\"lastname\":{\"type\":\"string\",\"example\":\"Smith\"},\"email\":{\"type\":\"string\",\"example\":\"john.smith@example.com\"}}}}}}"
    },
    "request": {
      "method": "GET",
      "uri": "/0/accounts/99/users?limit=10",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+200\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '200'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.248Z",
    "duration": 83
  },
  {
    "status": "fail",
    "title": "GET /0/accounts",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '200'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts",
      "actionName": "Find accounts associated with the loggedin user",
      "exampleName": "200 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443248,
    "start": "2016-12-12T17:24:03.248Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": [\n    {\n      \"id\": -92807852,\n      \"name\": \"Ut laborum non deserunt incididunt\"\n    },\n    {\n      \"id\": 48354115,\n      \"name\": \"ad voluptate\"\n    }\n  ]\n}",
      "statusCode": "200",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"name\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"name\":{\"type\":\"string\",\"example\":\"AccountName\"}}}}}}"
    },
    "request": {
      "method": "GET",
      "uri": "/0/accounts",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+200\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '200'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.504Z",
    "duration": 256
  },
  {
    "status": "pass",
    "title": "HEAD /0/ping",
    "message": "",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "meta",
      "resourceName": "/0/ping",
      "actionName": "HEAD",
      "exampleName": "204"
    },
    "startedAt": 1481563443504,
    "start": "2016-12-12T17:24:03.504Z",
    "actual": {
      "statusCode": 204,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": ""
    },
    "expected": {
      "headers": {},
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "HEAD",
      "uri": "/0/ping",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [],
        "realType": "text/plain",
        "expectedType": "text/plain",
        "validator": "TextDiff",
        "rawData": ""
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "",
        "results": []
      }
    },
    "valid": true,
    "end": "2016-12-12T17:24:03.521Z",
    "duration": 17
  },
  {
    "status": "fail",
    "title": "PATCH /0/users/77",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '200'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "users",
      "resourceName": "/0/users/{id}",
      "actionName": "Update an user",
      "exampleName": "200 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443521,
    "start": "2016-12-12T17:24:03.521Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": {\n    \"id\": -61006454,\n    \"firstname\": \"adipisicing id\",\n    \"lastname\": \"amet in ex aute\",\n    \"email\": \"consectetur laboris adipisicing irure\"\n  }\n}",
      "statusCode": "200",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"firstname\",\"lastname\",\"email\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"firstname\":{\"type\":\"string\",\"example\":\"John\"},\"lastname\":{\"type\":\"string\",\"example\":\"Smith\"},\"email\":{\"type\":\"string\",\"example\":\"john.smith@example.com\"}}}}}"
    },
    "request": {
      "method": "PATCH",
      "uri": "/0/users/77",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL",
        "Content-Length": 36
      },
      "body": "{\n  \"lastname\": \"nisi aliquip sed\"\n}"
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+200\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '200'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.589Z",
    "duration": 68
  },
  {
    "status": "skip",
    "title": "PATCH /0/users/77",
    "message": "Skipped in before hook",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "users",
      "resourceName": "/0/users/{id}",
      "actionName": "Update an user",
      "exampleName": "404 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443590,
    "start": "2016-12-12T17:24:03.590Z",
    "results": {
      "general": {
        "results": [
          {
            "severity": "warning",
            "message": "Skipped in before hook"
          }
        ]
      }
    }
  },
  {
    "status": "fail",
    "title": "PATCH /0/accounts/77",
    "message": "body: At '/data' Missing required property: data\nstatusCode: Status code is not '200'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{id}",
      "actionName": "Update an account",
      "exampleName": "200 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443593,
    "start": "2016-12-12T17:24:03.593Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "{\n  \"data\": {\n    \"id\": -24522921,\n    \"name\": \"qui in laborum\"\n  }\n}",
      "statusCode": "200",
      "bodySchema": "{\"type\":\"object\",\"required\":[\"data\"],\"properties\":{\"data\":{\"type\":\"object\",\"additionalProperties\":false,\"required\":[\"id\",\"name\"],\"properties\":{\"id\":{\"type\":\"integer\",\"format\":\"int32\",\"example\":42},\"name\":{\"type\":\"string\",\"example\":\"AccountName\"}}}}}"
    },
    "request": {
      "method": "PATCH",
      "uri": "/0/accounts/77",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL",
        "Content-Length": 2
      },
      "body": "{}"
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "pointer": "/data",
            "severity": "error",
            "message": "At '/data' Missing required property: data"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": "application/schema+json",
        "validator": "JsonSchema",
        "rawData": {
          "0": {
            "property": [
              "data"
            ],
            "attributeValue": true,
            "message": "At '/data' Missing required property: data",
            "validatorName": "error"
          },
          "length": 1
        }
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+200\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '200'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.649Z",
    "duration": 56
  },
  {
    "status": "skip",
    "title": "PATCH /0/accounts/77",
    "message": "Skipped in before hook",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{id}",
      "actionName": "Update an account",
      "exampleName": "404 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443649,
    "start": "2016-12-12T17:24:03.649Z",
    "results": {
      "general": {
        "results": [
          {
            "severity": "warning",
            "message": "Skipped in before hook"
          }
        ]
      }
    }
  },
  {
    "status": "fail",
    "title": "DELETE /0/users/77",
    "message": "body: Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'\nstatusCode: Status code is not '204'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "users",
      "resourceName": "/0/users/{id}",
      "actionName": "Deletes a user",
      "exampleName": "204 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443651,
    "start": "2016-12-12T17:24:03.651Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "DELETE",
      "uri": "/0/users/77",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "message": "Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'",
            "severity": "error"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": null,
        "validator": null,
        "rawData": null
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+204\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '204'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.700Z",
    "duration": 49
  },
  {
    "status": "skip",
    "title": "DELETE /0/users/77",
    "message": "Skipped in before hook",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "users",
      "resourceName": "/0/users/{id}",
      "actionName": "Deletes a user",
      "exampleName": "404 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443700,
    "start": "2016-12-12T17:24:03.700Z",
    "results": {
      "general": {
        "results": [
          {
            "severity": "warning",
            "message": "Skipped in before hook"
          }
        ]
      }
    }
  },
  {
    "status": "fail",
    "title": "DELETE /0/accounts/77",
    "message": "body: Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'\nstatusCode: Status code is not '204'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{id}",
      "actionName": "Deletes a account",
      "exampleName": "204 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443702,
    "start": "2016-12-12T17:24:03.702Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "DELETE",
      "uri": "/0/accounts/77",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "message": "Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'",
            "severity": "error"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": null,
        "validator": null,
        "rawData": null
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+204\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '204'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.742Z",
    "duration": 40
  },
  {
    "status": "fail",
    "title": "DELETE /0/accounts/99/users/88",
    "message": "body: Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'\nstatusCode: Status code is not '204'\n",
    "origin": {
      "filename": "http://localhost:8000/0/api-docs",
      "apiName": "API-NODE-SWAGGER",
      "resourceGroupName": "accounts",
      "resourceName": "/0/accounts/{account_id}/users/{user_id}",
      "actionName": "Remove an account user association",
      "exampleName": "204 > application/json; charset=utf-8"
    },
    "startedAt": 1481563443742,
    "start": "2016-12-12T17:24:03.742Z",
    "actual": {
      "statusCode": 401,
      "headers": {
        "x-powered-by": "Express",
        "vary": "Origin",
        "content-type": "application/json; charset=utf-8",
        "content-length": "73",
        "etag": "W/\"49-OTqvCHxitke0XshWDY4ixQ\"",
        "date": "Mon, 12 Dec 2016 17:24:03 GMT",
        "connection": "close"
      },
      "body": "{\"errors\":[{\"code\":\"UNAUTHORIZED\",\"message\":\"token invalid or missing\"}]}"
    },
    "expected": {
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": "",
      "statusCode": "204"
    },
    "request": {
      "method": "DELETE",
      "uri": "/0/accounts/99/users/88",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json; charset=utf-8",
        "User-Agent": "HyperTest/0.1.0 (Darwin 15.6.0; x64)",
        "Authorization": "Bearer SOMEKEYSOMEKEYLOCAL"
      },
      "body": ""
    },
    "results": {
      "general": {
        "results": []
      },
      "headers": {
        "results": [],
        "realType": "application/vnd.apiary.http-headers+json",
        "expectedType": "application/vnd.apiary.http-headers+json",
        "validator": "HeadersJsonExample",
        "rawData": {
          "length": 0
        }
      },
      "body": {
        "results": [
          {
            "message": "Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:\n\n^\nExpecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'EOF'",
            "severity": "error"
          }
        ],
        "realType": "application/json; charset=utf-8",
        "expectedType": null,
        "validator": null,
        "rawData": null
      },
      "statusCode": {
        "realType": "text/vnd.apiary.status-code",
        "expectedType": "text/vnd.apiary.status-code",
        "validator": "TextDiff",
        "rawData": "@@ -1,3 +1,3 @@\n-401\n+204\n",
        "results": [
          {
            "severity": "error",
            "message": "Status code is not '204'"
          }
        ]
      }
    },
    "valid": false,
    "end": "2016-12-12T17:24:03.761Z",
    "duration": 19
  }
]
```
