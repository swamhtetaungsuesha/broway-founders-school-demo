import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  
  render() {
    return (
      <Html>
        <Head >
            <link rel="icon" href="/images/logo.png" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
              <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Inline+One:ital@1&family=Bellota:ital,wght@1,700&family=Fugaz+One&family=Hepta+Slab:wght@500&family=Inter:wght@300&family=Josefin+Sans:ital,wght@1,700&family=Signika+Negative:wght@300;400&display=swap" rel="stylesheet"/>
            <script src="https://www.recaptcha.net/recaptcha/api.js" async defer></script>
 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument