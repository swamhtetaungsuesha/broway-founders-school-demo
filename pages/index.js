import Head from 'next/head'
import { useContext } from 'react'

import { DataContext } from '../store/GlobalState'
import tw from 'tailwind-styled-components/dist/tailwind'

import SlickComponent from '../components/home/SlickComponent';
import WelcomeComponent from '../components/home/WelcomeComponent';
import AcademicsComponent from '../components/home/AcademicsComponent';
import NewsComponent from '../components/home/NewsComponent';
import CampusAndComment from '../components/home/CampusAndComment';
import LatestNewsAndInbox from '../components/home/LatestNewsAndInbox';
import EventsComponent from '../components/home/EventsComponent';
import { getHome } from '../middleware/serverLogic';
export default function Home({latestNews}) {

  const { state,dispatch } = useContext(DataContext)
  const { menuItems } = state


  return (
    <div>
      <Head>
        <title>BROWAY Founders School Yangon</title>
        <meta name="description" content="Generated by BROWAY" />
       
      </Head>
      <Wrapper>
        <SlickComponent admissionItems={menuItems.filter(item=>item._id.field==='admission')}/>
        <AboutUsWrapper>
          <WelcomeComponent/>
         
        </AboutUsWrapper>
        <div className='py-20 bg-slate-200'>

        <EventsComponent items={menuItems.filter(item=>item._id.routerPath==='/posts/events')[0].items.slice(0,2)}/>
        </div>
        <div className='py-10 '>

        <AcademicsComponent academicsItems={menuItems.filter(item=>item._id.field==='academics')}/>
        </div>

        <div className='gb_bg'>

        <NewsComponent item={menuItems.filter(item=>item._id.routerPath==='/news')[0]._id}/>
        </div>
        <CampusAndComment/>
        <LatestNewsAndInbox items={latestNews}/>


      </Wrapper>
    </div>
  )
}

const Wrapper = tw.section`
w-full lg:my-5
`


const AboutUsWrapper = tw.div``



export async function getStaticProps() {
  
  const res = await getHome()


  return {
    props: {
      result: res.result,
      latestNews:res.latestNews

    },
  }
}
