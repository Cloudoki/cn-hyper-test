# Dredd Request Transaction

This is the object that is passed to all request hooks.

* Definition: http://dredd.readthedocs.io/en/latest/data-structures/#transaction-object

```
{
  name: 'users > /0/users/{id} > Deletes a user > 404 > application/json; charset=utf-8',
  id: 'DELETE /0/users/77',
  host: 'localhost',
  port: '8000',
  request: {
    method: 'DELETE',
    uri: '/0/users/77',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json; charset=utf-8',
      'User-Agent': 'Dredd/2.2.3 (Darwin 15.6.0; x64)'
    },
    body: ''
  },
  expected: {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: '{}',
    statusCode: '404',
    bodySchema: '{"type":"object","additionalProperties":false,"properties":{"errors":{"type":"array","items":{"type":"object","additionalProperties":false,"required":["code","message"],"properties":{"code":{"type":"string","example":"NOT_FOUND"},"message":{"type":"string","example":"Not found"}}}}}}'
  },
  origin: {
    filename: 'http://localhost:8000/0/api-docs',
    apiName: 'API-NODE-SWAGGER',
    resourceGroupName: 'users',
    resourceName: '/0/users/{id}',
    actionName: 'Deletes a user',
    exampleName: '404 > application/json; charset=utf-8'
  },
  fullPath: '/0/users/77',
  protocol: 'http:',
  skip: true
}
```
