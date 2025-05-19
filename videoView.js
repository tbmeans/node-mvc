exports.render = function(id, title, isCc) {
	return (
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body {
        background: black;
        text-align: center;
      }
      video {
        padding-top: 10rem;
      }
    </style>
  </head>
  <body>
    <video controls autoplay name="media">
      <source src="/Videos/${id}.mp4" type="video/mp4">
      ${isCc > 0 && `<track default kind="captions" src="/Videos/${id}.vtt">` || ''}
    </video>
  </body>
</html>`
  );
};
