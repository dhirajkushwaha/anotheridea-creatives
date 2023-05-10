import React from 'react';
import Work, { WorkHero } from '.';

export function StrategyListItem(prop){

    return (
        <li className="ListIconTitleText-listItem">
            <div className="ListIconTitleText-icon"
            style={{WebkitMask: 'url("/assets/expertise-picto-ux.svg") center center no-repeat', transform: "translate3d(0px, 0px, 0px)", opacity: 1}} ></div>
            <h2 className="ListIconTitleText-listItemTitle">{prop.title}</h2>
            <div className="ListIconTitleText-listItemText">
                {prop.text}
            </div>
        </li>
    )
}

export default function Workshops() {
  return (
    <Work>
        <WorkHero title="Workshops" heroCopy={<>How we can empower your Teams<br/>The Credo Range of Skilling Workshops</>} />

        <div className="Workshops-video">
            <div className="Workshops-video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-C5POWufMQ8?controls=0&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; modestbranding; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>

        <div className="ListIconTitleText">
            <div className="ListIconTitleText-wrapper">
                <ul className="ListIconTitleText-list">
                    <StrategyListItem title={<>The Art Of Connecting before Selling.<br/>Sales Empowering Workshops.</>} text={<><ul className='Campaign-list'>
                                                                                                                                    <li>Workshops for Sales Enhancement</li>
                                                                                                                                    <li>Workshop for PreSales Department</li>
                                                                                                                                    <li>Modules on Customer Delight – Sales-centric</li>
                                                                                                                                    <li>Workshops for Channel Partners</li>
                                                                                                                                    <li>Workshops for Possession Stage</li>
                                                                                                                                    <li>Workshops for Project Selling to Customers</li>
                                                                                                                                    <li>CRM</li>
                                                                                                                                    <li>Negotiation</li>
                                                                                                                                </ul></>} />
                    <StrategyListItem title={<>Upgrading performance in areas beyond Sales.<br/>Expert Workshops.</>} text={<><ul className='Campaign-list'>
                                                                                                                                <li>Workshop for Marketing</li>
                                                                                                                                <li>Digital Marketing</li>
                                                                                                                                <li>Modules on Customer Delight – Sales-centric</li>
                                                                                                                                <li>Motivation</li>
                                                                                                                                <li>Women’s Safety</li>
                                                                                                                                <li>POSH – Sexual Harassment</li>
                                                                                                                            </ul></>} />
                    <StrategyListItem title={<>How to Hire and Retain the Right Talent.<br/>HR Attraction-Induction-Retention Workshops.</>} text={<><ul className='Campaign-list'>
                                                                                                                                                        <li>Induction Programs for New Hires</li>
                                                                                                                                                        <li>Coaching for Talent Empowerment – from hiring to retaining</li>
                                                                                                                                                    </ul></>} />
                </ul>
            </div>
        </div>
    </Work>
  )
}