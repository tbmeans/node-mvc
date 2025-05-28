const TITLE = 'Media server on the home network';

const MESSAGE = 'TV recordings';

const cats = require('./cats.js');

exports.initCat = { cat: cats.list[0] };

// Param "value" is the value for the query key "cat"
// Param "data" is the data obtained from the model using the "value"
exports.render = function(value, data) {
	return (`
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, 'initial-scale=1" />
    <title>${TITLE}</title>
    <style>
      body {
        font-family: Verdana, Arial, Helvetica, sans-serif;
      }
      h1 {
        color: white;
      }
      video {
        width: 1920px;
      }
      .hero {
        background-color: slateblue; text-align: center;
        height: 12rem; padding-top: 4rem;
      }
      #nav-list {
        list-style-type: none; padding-top: 5rem;
        text-align: left; padding-left: 2rem;
      }
      .nav-item {
        display: inline-block; padding-right: 2rem;
      }
      .nav-item > a {
        color: white; text-decoration: none;
      }
      .form-box {
        margin-top: 1rem; margin-left: 1rem;
      }
      .card-container {
        display: flex; flex-direction: column;
        margin: 2rem 4rem;
      }
      .card {
        text-align: center; margin-top: 1rem;
      }
      @media (min-width: 768px) {
        .card-container {
          flex-direction: row; flex-wrap: wrap;
        }
        .card {
          width: 400px;
        }
      }
    </style>
  </head> 
  <body>
    <div class="hero">
      <h1>${MESSAGE}</h1>
    </div>
    <div class="form-box">
      <form action="" method="GET">
        <label for="cat-sel">Pick a category</label>
        <select name="cat" id="cat-sel">
          ${cats.list.map(word => {
            return (`
              <option value="${word}"${word === value && ' selected' || ''}>
                ${word[0].toUpperCase() + word.slice(1)}
              </option>
            `);
          }).join('')}
        </select>
        <button>Show all in category</button>
      </form>
		</div>
    <div class="card-container">
      ${data.map(rec => {
        return (rec && `
          <div class="card">
            <a href="/Videos/${rec.whenrec}/">
              <img src="/img/${rec.whenrec}.png" alt="${rec.title}">
              <h3>${rec.title}</h3>
            </a>
          </div>
        `);
      }).join('')}
    </div>
  </body>
</html>
`);
};
