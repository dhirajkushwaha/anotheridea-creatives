
import React from 'react'

import { colorIndex } from '.'

function WorknavItem(prop) {
  return (
    <a href={prop.link} className={"WorkNav-item " + (prop.activeIndex === prop.index ? "Active-item" : "")}>
        <div className="WorkNav-itemInner">
            <div className="WorkNav-itemLabel">{prop.label}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="WorkNav-itemArrow icon sprite-icons">
                <path xmlns="http://www.w3.org/2000/svg" d="M8.3 2.2L15 8.9H0V12h15l-6.7 6.7 2.2 2.2L21 10.4 10.5 0 8.3 2.2z"/>
            </svg>
            <div className="WorkNav-itemColorWrap">
                <div className="WorkNav-itemColor" style={{backgroundColor: prop.color}}></div>
            </div>
        </div>
    </a>
  )
}


export default function Worknav(prop) {

  return (
        <>
            <div className="WorkNav">
                <div className="WorkNav-inner">
                    <div className="WorkNav-wrapper">
                        <WorknavItem index={0} activeIndex={prop.activeIndex} link="/work/branding" label="Branding" color={colorIndex[0]} />
                        <WorknavItem index={1} activeIndex={prop.activeIndex} link="/work/campaigns" label="Campaigns" color={colorIndex[1]} />
                        <WorknavItem index={2} activeIndex={prop.activeIndex} link="/work/content" label="Content" color={colorIndex[2]} />
                        <WorknavItem index={3} activeIndex={prop.activeIndex} link="/work/strategy" label="Strategy" color={colorIndex[3]} />
                        <WorknavItem index={4} activeIndex={prop.activeIndex} link="/work/workshops" label="Workshops" color={colorIndex[4]} />
                    </div>
                </div>
            </div>
        </>
  )
}