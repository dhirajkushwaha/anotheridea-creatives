import React from 'react'

import Work, { WorkHero } from '.'


function StrategyListItem(prop){

    return (
        <li className="ListIconTitleText-listItem">
            <div className="ListIconTitleText-icon" style={{WebkitMask: 'url("/assets/expertise-picto-ux.svg") center center no-repeat', transform: "translate3d(0px, 0px, 0px)", opacity: 1}} ></div>
            {/* <h2 className="ListIconTitleText-listItemTitle">{prop.title}</h2> */}
            <div className="ListIconTitleText-listItemText">
                <p>{prop.text}</p>
            </div>
        </li>
    )
}

export default function Strategy() {
  return (
    <Work>
        <WorkHero title="Strategy" heroCopy="" />

        <div className="ListIconTitleText">
            <div className="ListIconTitleText-wrapper">
                <ul className="ListIconTitleText-list">
                    <StrategyListItem title="1" text="India is on the path to progress. The fast rising demand for homes is testament to this growth." />
                    <StrategyListItem title="2" text="Developers are doing their best and beyond, to respond to the gap between supply and demand." />
                    <StrategyListItem title="3" text="One factor stands in between what the real estate industry desires and ultimately achieves." />
                    <StrategyListItem title="4" text="The Struggling Ratio between leads to walk-ins; between walk-ins to closure of sales. The real estate industry’s maximum rate of conversions currently stands at a mere 7 – 10%." />
                    <StrategyListItem title="5" text="The main factor leading to the gap between vision and reality, between leads and conversions lies at the Sales level." />
                </ul>
            </div>
        </div>

        <div className="TitleTextButton app-container">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text'>How can we reduce the gap between Skills and Sales?</p>
                    <p className='TitleTextButton-text' style={{textTransform: "uppercase", marginTop: "1rem"}} >This is where we come </p>
                </div>
            </div>
        </div>
        <div className="TitleTextButton app-container">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text app-text--large' style={{color:"var(--page-color)", fontSize:"4rem"}}>We are Credo Consulting.</p>
                    <p className='TitleTextButton-text'>A visionary part of Another Idea.</p>
                    <p className='TitleTextButton-listItemText'>Think of us as a Training & Enabling Partner who will help sensitise your Sales and other resources to the true potential of your projects.</p>
                </div>
            </div>
        </div>
        <div className="TitleTextButton app-container">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text' >What sets up apart:</p>
                    <p className='TitleTextButton-text'>End to end solutions. <br /> Scale of understanding.</p>
                    <p className='TitleTextButton-listItemText'>Our expertise to help bridge essential skill gaps comes from 33+ years of experience in understanding the Indian real estate market and home buying behaviour.</p>
                </div>
            </div>
        </div>
        <div className="TitleTextButton app-container">
            <div className="TitleTextButton-wrapper">
                <div className="TitleTextButton-wrapperSmall">
                    <p className='TitleTextButton-text' >What we provide:</p>
                    <p className='TitleTextButton-text'>Decades of exposure. <br /> From Leads to walk-ins to sales closure.</p>
                    <p className='TitleTextButton-listItemText'>Successful customer conversions will depend on the performance of the Sales Team, across every stage of the process. Our solutions encompass skill improvement from start to end of the sales journey.</p>
                </div>
            </div>
        </div>



    </Work>
  )
}