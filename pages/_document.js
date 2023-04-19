import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html style={{"--sbw":"0px"}}>
      <Head>
            {/* Javascript */}
            <script async src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>


            {/* Favicon */}
            <link rel="shortcut icon" href="http://www.anotherideaproductions.com/assets/img/favicon.png" type="image/x-icon" />

            {/* Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true".toString()}/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

            {/* Preload */}
            <link rel='prefetch' href='/assets/AI_Logo.json' />


      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}