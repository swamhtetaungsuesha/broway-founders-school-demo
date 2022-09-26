import Layout from '../components/Layout'
import DataProvider from '../store/GlobalState'
import '../styles/globals.css'
import NProgress from "nprogress"
import Router from "next/router"



Router.onRouteChangeStart = url => {
  
  NProgress.start()
}

Router.onRouteChangeComplete = () =>{

   NProgress.done()
  }

Router.onRouteChangeError = () => NProgress.done()

function MyApp({Component,pageProps}) {


  return (
    <>
  
    
      <DataProvider >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  )
}

export default MyApp


