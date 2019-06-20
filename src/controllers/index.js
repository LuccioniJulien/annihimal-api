export function get(request, response) {
  response.send(JSON.stringify({ msg: "Hello world" }));
}
