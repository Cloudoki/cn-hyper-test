# Swagger API

A Swagger spec as parsed by [swagger-parser](https://github.com/BigstickCarpet/swagger-parser).

```
{
  "tags": [
    {
      "name": "accounts",
      "description": "Operations about Accounts"
    },
    {
      "name": "users",
      "description": "Operations about Users"
    },
    {
      "name": "meta",
      "description": "Operations related to the API"
    },
    {
      "name": "interact",
      "description": "Interact with the API"
    }
  ],
  "host": "localhost:8000",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json; charset=utf-8"
  ],
  "info": {
    "version": "0.1.0",
    "title": "API-NODE-SWAGGER",
    "description": "Example API layer"
  },
  "basePath": "/0",
  "swagger": "2.0",
  "paths": {
    "/accounts": {
      "get": {
        "tags": [
          "accounts"
        ],
        "summary": "Find accounts associated with the loggedin user",
        "description": "Returns all the user associated accounts",
        "operationId": "getUserAccounts",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "responses": {
          "200": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "name"
                    ],
                    "properties": {
                      "id": {
                        "type": "integer",
                        "format": "int32",
                        "example": 42
                      },
                      "name": {
                        "type": "string",
                        "example": "AccountName"
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/accounts/{id}": {
      "patch": {
        "tags": [
          "accounts"
        ],
        "summary": "Update an account",
        "operationId": "patchAccount",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the resource",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 77
          },
          {
            "in": "body",
            "name": "body",
            "description": "Update specific fields of resource",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "example": "AccountName"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name"
                  ],
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "example": 42
                    },
                    "name": {
                      "type": "string",
                      "example": "AccountName"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Resource Not Found",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "NOT_FOUND"
                      },
                      "message": {
                        "type": "string",
                        "example": "Not found"
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "accounts"
        ],
        "summary": "Deletes a account",
        "operationId": "deleteAccount",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the resource",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 77
          }
        ],
        "responses": {
          "204": {
            "description": "Successful, no content returned"
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/accounts/{account_id}/users": {
      "post": {
        "tags": [
          "accounts"
        ],
        "summary": "Invite an user and/or associate it with the account",
        "operationId": "postAccountUser",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "description": "User creation by invitation and associate with a specific account. If the user already exists (uniquely identified by email) it will only associate.\n",
        "parameters": [
          {
            "name": "account_id",
            "in": "path",
            "description": "Account ID",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 99
          },
          {
            "in": "body",
            "name": "body",
            "description": "Invite an user",
            "required": true,
            "schema": {
              "type": "object",
              "required": [
                "email",
                "firstname",
                "lastname"
              ],
              "properties": {
                "firstname": {
                  "type": "string",
                  "example": "John"
                },
                "lastname": {
                  "type": "string",
                  "example": "Smith"
                },
                "email": {
                  "type": "string",
                  "example": "john.smith@example.com"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "firstname",
                    "lastname",
                    "email"
                  ],
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "example": 42
                    },
                    "firstname": {
                      "type": "string",
                      "example": "John"
                    },
                    "lastname": {
                      "type": "string",
                      "example": "Smith"
                    },
                    "email": {
                      "type": "string",
                      "example": "john.smith@example.com"
                    }
                  }
                }
              }
            }
          },
          "204": {
            "description": "Successful user association (user already exists)"
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "accounts"
        ],
        "summary": "Find users associated with the account",
        "description": "Returns all the account associated users",
        "operationId": "getAccountUsers",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "parameters": [
          {
            "name": "account_id",
            "in": "path",
            "description": "Account ID",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 99
          },
          {
            "name": "name",
            "in": "query",
            "type": "string",
            "description": "Search account users by first or last name"
          },
          {
            "name": "limit",
            "in": "query",
            "type": "integer",
            "format": "int32",
            "description": "limit the number of upcoming results",
            "x-example": 10
          }
        ],
        "responses": {
          "200": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "firstname",
                      "lastname",
                      "email"
                    ],
                    "properties": {
                      "id": {
                        "type": "integer",
                        "format": "int32",
                        "example": 42
                      },
                      "firstname": {
                        "type": "string",
                        "example": "John"
                      },
                      "lastname": {
                        "type": "string",
                        "example": "Smith"
                      },
                      "email": {
                        "type": "string",
                        "example": "john.smith@example.com"
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/accounts/{account_id}/users/{user_id}": {
      "delete": {
        "tags": [
          "accounts"
        ],
        "summary": "Remove an account user association",
        "operationId": "deleteAccountUser",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "accounts"
            ]
          }
        ],
        "parameters": [
          {
            "name": "account_id",
            "in": "path",
            "description": "Account ID",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 99
          },
          {
            "name": "user_id",
            "in": "path",
            "description": "User ID",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 88
          }
        ],
        "responses": {
          "204": {
            "description": "Successful, no content returned"
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/ping": {
      "get": {
        "tags": [
          "meta"
        ],
        "description": "Returns 'pong' to the caller",
        "operationId": "getPing",
        "produces": [],
        "responses": {
          "204": {
            "description": "Successful, no content returned"
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "head": {
        "tags": [
          "meta"
        ],
        "description": "Returns 'pong' to the caller",
        "operationId": "headPing",
        "produces": [],
        "responses": {
          "204": {
            "description": "Successful, no content returned"
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      "patch": {
        "tags": [
          "users"
        ],
        "summary": "Update an user",
        "operationId": "patchUser",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "users"
            ]
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the resource",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 77
          },
          {
            "in": "body",
            "name": "body",
            "description": "Update specific fields of resource",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "firstname": {
                  "type": "string",
                  "example": "John"
                },
                "lastname": {
                  "type": "string",
                  "example": "Smith"
                },
                "password": {
                  "type": "string",
                  "format": "password",
                  "example": "Password1"
                },
                "current_password": {
                  "type": "string",
                  "format": "password",
                  "example": "Password1"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "firstname",
                    "lastname",
                    "email"
                  ],
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "example": 42
                    },
                    "firstname": {
                      "type": "string",
                      "example": "John"
                    },
                    "lastname": {
                      "type": "string",
                      "example": "Smith"
                    },
                    "email": {
                      "type": "string",
                      "example": "john.smith@example.com"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Resource Not Found",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "NOT_FOUND"
                      },
                      "message": {
                        "type": "string",
                        "example": "Not found"
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "users"
        ],
        "summary": "Deletes a user",
        "operationId": "deleteUser",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "users"
            ]
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the resource",
            "required": true,
            "type": "integer",
            "format": "int32",
            "x-example": 77
          }
        ],
        "responses": {
          "204": {
            "description": "Successful, no content returned"
          },
          "404": {
            "description": "Resource Not Found",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "NOT_FOUND"
                      },
                      "message": {
                        "type": "string",
                        "example": "Not found"
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/me": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "Find yourself",
        "operationId": "me",
        "security": [
          {
            "api_key": []
          },
          {
            "oauth2": [
              "users"
            ]
          }
        ],
        "description": "Returns current logged in user information and accounts",
        "responses": {
          "200": {
            "description": "Successful",
            "schema": {
              "type": "object",
              "required": [
                "data"
              ],
              "properties": {
                "data": {
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "firstname",
                    "lastname",
                    "email",
                    "accounts"
                  ],
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "example": 42
                    },
                    "firstname": {
                      "type": "string",
                      "example": "John"
                    },
                    "lastname": {
                      "type": "string",
                      "example": "Smith"
                    },
                    "email": {
                      "type": "string",
                      "example": "john.smith@example.com"
                    },
                    "accounts": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "name"
                        ],
                        "properties": {
                          "id": {
                            "type": "integer",
                            "format": "int32",
                            "example": 42
                          },
                          "name": {
                            "type": "string",
                            "example": "AccountName"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected Internal Server Error",
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "errors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "code",
                      "message"
                    ],
                    "properties": {
                      "code": {
                        "type": "string",
                        "example": "UNEXPECTED_ERROR"
                      },
                      "message": {
                        "type": "string",
                        "example": "Internal Server error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "account_post": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "AccountName"
        }
      }
    },
    "account": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "id",
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "example": 42
        },
        "name": {
          "type": "string",
          "example": "AccountName"
        }
      }
    },
    "account_patch": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "AccountName"
        }
      }
    },
    "user_post": {
      "type": "object",
      "required": [
        "email",
        "password",
        "firstname",
        "lastname"
      ],
      "properties": {
        "firstname": {
          "type": "string",
          "example": "John"
        },
        "lastname": {
          "type": "string",
          "example": "Smith"
        },
        "email": {
          "type": "string",
          "example": "john.smith@example.com"
        },
        "password": {
          "type": "string",
          "format": "password",
          "example": "Password1"
        }
      }
    },
    "user": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "id",
        "firstname",
        "lastname",
        "email"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "example": 42
        },
        "firstname": {
          "type": "string",
          "example": "John"
        },
        "lastname": {
          "type": "string",
          "example": "Smith"
        },
        "email": {
          "type": "string",
          "example": "john.smith@example.com"
        }
      }
    },
    "user_patch": {
      "type": "object",
      "properties": {
        "firstname": {
          "type": "string",
          "example": "John"
        },
        "lastname": {
          "type": "string",
          "example": "Smith"
        },
        "password": {
          "type": "string",
          "format": "password",
          "example": "Password1"
        },
        "current_password": {
          "type": "string",
          "format": "password",
          "example": "Password1"
        }
      }
    },
    "user_invitation": {
      "type": "object",
      "required": [
        "email",
        "firstname",
        "lastname"
      ],
      "properties": {
        "firstname": {
          "type": "string",
          "example": "John"
        },
        "lastname": {
          "type": "string",
          "example": "Smith"
        },
        "email": {
          "type": "string",
          "example": "john.smith@example.com"
        }
      }
    },
    "user_me": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "id",
        "firstname",
        "lastname",
        "email",
        "accounts"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "example": 42
        },
        "firstname": {
          "type": "string",
          "example": "John"
        },
        "lastname": {
          "type": "string",
          "example": "Smith"
        },
        "email": {
          "type": "string",
          "example": "john.smith@example.com"
        },
        "accounts": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id",
              "name"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int32",
                "example": 42
              },
              "name": {
                "type": "string",
                "example": "AccountName"
              }
            }
          }
        }
      }
    }
  },
  "responses": {
    "badRequest": {
      "description": "Bad Request",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "NOT_FOUND"
                },
                "message": {
                  "type": "string",
                  "example": "Bad request"
                }
              }
            }
          }
        }
      }
    },
    "notFound": {
      "description": "Resource Not Found",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "NOT_FOUND"
                },
                "message": {
                  "type": "string",
                  "example": "Not found"
                }
              }
            }
          }
        }
      }
    },
    "noContent": {
      "description": "Successful, no content returned"
    },
    "badContentType": {
      "description": "Unacceptable Content-Type",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "INVALID_CONTENT_TYPE"
                },
                "message": {
                  "type": "string",
                  "example": "Invalid content type"
                }
              }
            }
          }
        }
      }
    },
    "unexpected": {
      "description": "Unexpected Internal Server Error",
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "code",
                "message"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "example": "UNEXPECTED_ERROR"
                },
                "message": {
                  "type": "string",
                  "example": "Internal Server error"
                }
              }
            }
          }
        }
      }
    }
  },
  "parameters": {
    "id": {
      "name": "id",
      "in": "path",
      "description": "ID of the resource",
      "required": true,
      "type": "integer",
      "format": "int32",
      "x-example": 77
    },
    "user_id": {
      "name": "user_id",
      "in": "path",
      "description": "User ID",
      "required": true,
      "type": "integer",
      "format": "int32",
      "x-example": 88
    },
    "account_id": {
      "name": "account_id",
      "in": "path",
      "description": "Account ID",
      "required": true,
      "type": "integer",
      "format": "int32",
      "x-example": 99
    },
    "limit": {
      "name": "limit",
      "in": "query",
      "type": "integer",
      "format": "int32",
      "description": "limit the number of upcoming results",
      "x-example": 10
    },
    "offset": {
      "name": "offset",
      "in": "query",
      "type": "integer",
      "format": "int32",
      "description": "offset the upcoming results",
      "x-example": 1
    }
  },
  "securityDefinitions": {
    "api_key": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    },
    "oauth2": {
      "type": "oauth2",
      "scopes": {
        "users": "Grants read/write access to profile info",
        "accounts": "Grants read/write access to accounts"
      },
      "flow": "implicit",
      "authorizationUrl": "http://localhost:8000/oauth2/login"
    }
  }
}
```
