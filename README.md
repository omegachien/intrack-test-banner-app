### Banner App

A simple app that boot up a nodejs server.

2 API end points:

```
GET
/banners
```
`Parameter: user_id`
`E.g. /banners?user_id=user-1`

Get all the available banners, might need to do pagination once the list grows.
If `user_id` is provided, will filter banner based on user's segment.

```
POST
/banner
```
Create Banner
`Parameter: id (text), name (text), target (text / array)`

Example data in the POST body:
```
id: banner-id-1
name: banner-1
target: segment-1
```

```
id: banner-id-2
name: banner-2
target[0]: segment-2
target[1]: segment-3
```