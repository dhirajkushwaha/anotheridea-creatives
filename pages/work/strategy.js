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



    </Work>
  )
}