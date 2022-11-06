# Blog Api
This is an api for a blog

---

## Requirements
1. User should be able to signup 
2. User should be able to login with Passport using JWT
3.  logged in User or non logged in user should be able to get published blogs
4. logged in User or non logged in user should be able to get just a blog
5. logged in Users should be able to create blogs and publish them
6. logged in Users should be able to update and delete blogs if they are the author
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm install` for dependencies
- run `npm run start:dev`

---
## Base URL
- https://lively-gray-eagle.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  required |
|  password |   string |  required  |



### blogs
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  timestamp |  date |  optional |
|  state | string  |  required,default:'draft'|
|  read_time  |  string |  required  |
|  read_count  |  number |  required  |
|  author  |  object |  required  |
|  blogInfo     | object  |  required |
|  blogInfo.title |   string |  required, unique  |
|  blogInfo.description |  string |  required |
|  blogInfo.body |  string |  required |
|  blogInfo.tags |  string |  required, enum: ['tech', 'sport', 'international', 'others'] |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "kanye@example.com",
  "password": "yezzy23"
}
```

- Responses

signup successful
```
{
    message: 'Signup successful',
    user: {
        "email": "kanye@example.com",
        "password": hash("yezzy23")
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "yezzy23",
  "email": "kanye@example.com",
}
```

- Responses

Success
```
{
    token: 'sjlkafjkldsfjsdjc92u11u8ex e nxjjurvnroie83y37712jbuewbdjbcbc'
}
```

---
### Create blogs

- Route: /orders/:authorId
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    blogInfo: { 
        "title": 'elon charges  8$ for blue tick',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
}
```

- Responses

Success
```
{
    state: "draft",
    read_count: 0,
    created_at: 2022-11-1T02:37:00.791Z+0100,
    blogInfo: { 
        "title": 'elon charges  8$ for blue tick',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
}
```
---
### Publish blog
- Route: /blogs/publishblog/:blogId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
-confim
Success
```
{
    state: "published",
    read_count: 0,
    created_at: 2022-11-1T02:37:00.791Z+0100,
    blogInfo: { 
        "title": 'elon charges  8$ for blue tick',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
}
```
---

### Get blog

- Route: /blogs/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success

```
{
    state: "published",
    read_count: 0,
    created_at: 2022-11-1T02:37:00.791Z+0100,
    blogInfo: { 
        "title": 'elon charges  8$ for blue tick',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
}
```
---

### Get blogs

- Route: /blogs
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page 
    - order (options: asc | desc, default: desc)
- Responses

Success
```
{
    state: "published",
    read_count: 0,
    created_at: 2022-11-1T02:37:00.791Z+0100,
    blogInfo: { 
        "title": 'elon charges  8$ for blue tick',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
}
```
---
### Update blogs

- Route: /blogs/:id
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
     
        "title": 'elon charges  8$ '
        
}
```
- Depends on blog property you want to update
Success
```
{
    message: "blog sucessfully updated",
    {
    state: "published",
    read_count: 0,
    created_at: 2022-11-1T02:37:00.791Z+0100,
    blogInfo: { 
        "title": 'elon charges  8$ ',
         "description": "elon charges  8$ for blue tick because twitter is loosing daily and wants to change that", 
         "body": 'elon charges  8$ for blue tick because twitter is loosing daily and wants to change that ...', 
         "tags": "tech"
         }
    }
}
```
---

### Delete blogs

- Route: /blogs/:id
- Method: DELETE
- Header
    - Authorization: Bearer {token}

```
{
    {
            message: "deleted sucessfully"
        }
}
```

---



## Contributor
- Itohowo Monday