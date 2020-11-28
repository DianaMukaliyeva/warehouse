# Warehouse

[Project assignment for Junior Developers at Reaktor](https://www.reaktor.com/junior-dev-assignment/).
<br>
The app deployed [on Heroku](https://warehouse2020.herokuapp.com/).

## Task

The aim of this assignment is to build fast and simple web app for a clothing brand to use in their warehouse.
To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI.

## Technologies

- React
- Materiaul UI

## Project details

The app uses two different APIs, after which information combined and displayed to table.

### Features

- Responsive UI
- Fast and simple navigation
- Quick filtering products by name, color and manufacturer
- Pagination
- Possibility to quickly add a new category by adding category name to array in `categories.js` file

### API documentation

#### Endpoints

**GET /products/:category**

- Fetches a list of products in a given category
- Request parameter _category_ - the name of the category product
- Sample of the response

```
[
  {
    "id": "some1id",
    "type": "category",
    "name": "Some Name",
    "color": [
        "yellow",
        "red"
    ],
    "price": 200,
    "manufacturer": "manufacturer"
  },
  {
    "id": "some2id",
    "type": "category",
    "name": "Another Name",
    "color": [
        "black"
    ],
    "price": 256,
    "manufacturer": "manufacturer"
  }
]
```

**GET /availability/:manufacturer**

- Fetches a list of availability of products by manufacturer
- Request parameter _manufacturer_ - the name of the manufacturer
- Sample of the response

```
{
  "code": 200,
  "response": [
    {
        "id": "SOME1ID",
        "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
    },
    {
        "id": "SOME2ID",
        "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>OUTOFSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
    },
    {
        "id": "SOME3ID",
        "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>LESSTHAN10</INSTOCKVALUE>\n</AVAILABILITY>"
    }
}
```

#### Error handling

- One API gives some random error which we can reproduce by providing request header: `x-force-error-mode`.
  Result of the error is responding with status code 200, but instead of array of availability information response contains string `"[]"`.
  Error was handled by repeating request several times.

- Both APIs have an internal cache of about 5 minutes. The app refreshes availability information 5 minutes after the request.

## Ways to improve

- Set up server side for retrieving information from APIs. It would remove all complex logic from the frontend.
  Also with backend, I could compare eTag headers to see if information changed by sending `If-None-Match` header with the eTag for the current version of resources.
- Use Redux for managing data.

## Run locally

- Run command `npm install` to install all dependencies
- Run command `npm start` to start the app in development mode
- Run command `npm test` to run unit tests
