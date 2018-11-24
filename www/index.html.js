const PLATFORM_TITLE_TEXT = "{{INSERT YOUR TITLE HERE}}";

module.exports = () =>
  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <base href="/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">
        <link rel="manifest" href="/manifest.json">
        <title>${PLATFORM_TITLE_TEXT}</title>
      </head>
      <body>
        <noscript>
        For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="https://www.enable-javascript.com/" target="_blank" rel="noopener noreferrer"> instructions how to enable JavaScript in your web browser</a>.
        </noscript>
        <div id="app"></div>
      </body>
    </html>
  `;
