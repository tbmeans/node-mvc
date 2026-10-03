const TITLE = 'Media server on the home network';

const MESSAGE = 'TV recordings';

const cats = require('./cats.js');

exports.initCat = cats.list[0];

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
            <a href="/Videos/${rec.whenrec}">
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

/* Advice on slash trailing after slug
https://boldist.co/search-engine-marketing/how-to-write-a-slug/
https://www.customerimpact.be/en/blog/url-slug/

When fixing the project 20261002, my natural assumption
is that my video-ID-as-slug pointing to displaying a 
single video playback in browser should NOT have a trailing
slash but I had decided the opposite here originally. 
Took trailing slash out of the <a> href here 20261002
because the references say that traditionally, slugs pointing to specific
files or single articles, as mine will do, don't have trailing slashes, 
and a trailing slash reflects a directory in server file structure,
and I guess the view for server directory should be an index page that
directs you to however many pages, articles, and resources that live in
that particular server directory, with the home page index being an 
exception in that it's proper url does not have a trailing slash.

Fixing this trailing slash was fine and all but it did not solve the
problem of the VIDEO VIEW no longer working. See the model takes a 
video id and returns an object which then causes the data.map in this
HOME VIEW to fail. Home view is looking for the tvrecs data array subset
not a single object from that array! So the problem was how 20261002
I combined handling of video ID with query and home and 
/Videos/ by the home controller. So rolling back to handle video ID 
in a condition separate from home/filters/allvideos so that the video
controller can be employed.  
*/
