// Every fake API answer, in match order. Each handler: { method = "GET", path, reply, status?, raw?, contentType? }.
// `path` is relative to /api/v1/web/ with ":name" parameters (or a RegExp); `reply` is an object or
// ({ params, query, body }) => object. Unknown endpoints get an empty answer and are listed after a run.
const { svgFor } = require("./media");

const media = [
  { path: /^(uploads|media)\/.+$/, raw: true, contentType: "image/svg+xml", reply: ({ path }) => svgFor(path) },
];

module.exports = {
  handlers: [
    ...media,
    ...require("./more").handlers,
    ...require("./owner").handlers,
    ...require("./admin").handlers,
    ...require("./partner").handlers,
    ...require("./public").handlers,
  ],
};
