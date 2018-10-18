# Review Questions

## What is Node.js?
Node JS is a JavaScript runtime environment that allows us to use JavaScript outside of a web browser.

## What is Express?
Express is a node framework used to abstract away some of the harder parts of setting up a Node server.


## Mention two parts of Express that you learned about this week.
Body parser and Middleware.

## What is Middleware?
middleware are functions that have access to the request object, response object and next function in the apps request response cycle.  They can execute any code, make changes to the request and response objects, end the request-response cycle and call the next middleware in the stack.

## What is a Resource?
these methods (HTTP Resource Methods) help build the RESTful crud APIs and they are GET,HEAD, POST, PUT, DELETE,CONNECT

## What can the API return to help clients know if a request was successful?
HTTP Status codes.

## How can we partition our application into sub-applications?
(did not cover per RYAN H.)


## What is CORS and why do we need it?
CORS (Cross Origin Resource Sharing) is a mechanism that uses extra HTTP headers to tell a browser to let a web APP at one domain to have permission to access selected resources from a server at a different origin (ex: web fonts, Images/videos, stylesheets, scritpts, FETCH APIs in a cross site manner).
