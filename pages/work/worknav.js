
import React from 'react'

function WorknavItem(prop) {
  return (
    <a href={prop.link} className="WorkNav-item">
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


export default function Worknav() {
  return (
        <>
            <div className="WorkNav">
                <div className="WorkNav-inner">
                    <div className="WorkNav-wrapper">
                        <WorknavItem link="/work/branding" label="Branding" color="#af37d9" />
                        <WorknavItem link="/work/compaigns" label="Compaigns" color="#de477e" />
                        <WorknavItem link="/work/content" label="Content" color="#f2ad45" />
                        <WorknavItem link="/work/strategy" label="Strategy" color="#3ab8c9" />
                        <WorknavItem link="/work/workshop" label="Workshop" color="#3b33b3" />
                    </div>
                </div>
            </div>
        </>
  )
}