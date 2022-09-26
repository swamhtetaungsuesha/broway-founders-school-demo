import React from 'react';
import tw from 'tailwind-styled-components/dist/tailwind';
import Head from 'next/head'
import { getData } from '../utils/fetchData';
import Layout from '../components/PageLayout/Layout';
import { getPrimary } from '../middleware/serverLogic';

const SchoolCalendar = (props) => {

    

  return (
    <>
     <Head>
        <title>School Calendar</title>
      </Head>
    <Layout category={props.selectedCategory} >
      <Wrapper>
        <Heading>
        Broway Founders School&lsquo;s
          <RedHeading>
          Official Calendar
          </RedHeading>
        </Heading>
        <CalendarWrapper>

          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FYangon&showNav=1&showTitle=1&title=Bomalian%20Education%20Official%20Calendar&src=c3dhbXN1ZXNoYTc2QGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=dGltZXMyLm9yZ19rYjljZWRoMjZzM3M3ZTdxc2NwOWF1MnIzNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dGltZXMyLm9yZ19oZThkaGM0NzA2NTc0dmhjaGthNG5lMWdsNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dGltZXMyLm9yZ19mOGQxcmN1YTVoa2VvOWdvNzByZm84cW4xY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2Iucm9tYW5pYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=dGltZXMyLm9yZ19nN2FnaDJvaGdvOHYzbmdmNmZwcmxvZzYxMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dGltZXMyLm9yZ19iMDcyOWI2NWViZDJhZnZ1a3RrNzJrMW1mNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dGltZXMyLm9yZ19mMGtyN2ptYmRjanBvZDYxdXFsYTZ2czdyY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTEyNzkyOTgwODk2MTI5MDcxODc2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%239E69AF&color=%23A79B8E&color=%237986CB&color=%230B8043&color=%237CB342&color=%237986CB&color=%23616161&color=%230047a8" style={{border:"solid 1px #777"}} width="800px" height="600px" frameBorder="0" scrolling="no"></iframe>
        </CalendarWrapper>

      </Wrapper>
    </Layout>
    </>
   
  )
}
const Wrapper = tw.section`
flex flex-col items-center 
`
const CalendarWrapper = tw.div`
max-w-[800px] w-full overflow-y-auto 
`

const Heading = tw.div`
text-3xl text-indigo-900  text-center my-4 uppercase
`

const RedHeading = tw.h3`
 sm:text-7xl text-5xl text-red-600
`

export default SchoolCalendar

export async function getStaticProps() {
  
    const res = await getPrimary('/calendar')
  
  
    return {
      props: {
        selectedCategory : res.selectedCategory,

      },
    }
  }
  
