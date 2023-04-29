import React from 'react'

import Work, { WorkHero, GallaryList, colorIndex } from '.'

const BROCHURES_DATA = [
    ["/", "/assets/brochuresimg/auris.png", "Auris Serenity", "/assets/brochurespdf/Auris Serenity brochure.pdf"],
    ["/", "/assets/brochuresimg/ibs.png", "IBS Bro", "/assets/brochurespdf/IBS Bro.pdf"],
    ["/", "/assets/brochuresimg/quantum.png", "Quantum E-Bro", "/assets/brochurespdf/Quantum E-Bro.pdf"],
    ["/", "/assets/brochuresimg/rodas.png", "Rodas", "/assets/brochurespdf/Rodas brochure.pdf"],
    ["/", "/assets/brochuresimg/montana.png", "Sheth - Montana", "/assets/brochurespdf/Sheth - Montana Brochure.pdf"],
    ["/", "/assets/brochuresimg/cnergy.png", "Sheth Cnergy", "/assets/brochurespdf/Sheth Cnergy - Commercial brochure.pdf"],
]

const SHORTLISTED_DATA = [
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Auris Serenity", "/assets/brochurespdf/Auris Serenity brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "IBS Bro", "/assets/brochurespdf/IBS Bro.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Quantum E-Bro", "/assets/brochurespdf/Quantum E-Bro.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Rodas", "/assets/brochurespdf/Rodas brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Sheth - Montana", "/assets/brochurespdf/Sheth - Montana Brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Sheth Cnergy", "/assets/brochurespdf/Sheth Cnergy - Commercial brochure.pdf"],
]

const NEWSPAPER_DATA = [
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Auris Serenity", "/assets/brochurespdf/Auris Serenity brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "IBS Bro", "/assets/brochurespdf/IBS Bro.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Quantum E-Bro", "/assets/brochurespdf/Quantum E-Bro.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Rodas", "/assets/brochurespdf/Rodas brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Sheth - Montana", "/assets/brochurespdf/Sheth - Montana Brochure.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Sheth Cnergy", "/assets/brochurespdf/Sheth Cnergy - Commercial brochure.pdf"],
]

export default function Campaigns(props) {
  return (
    <Work>
        {/* clearly it's top most reign of page */}
        <WorkHero title="Campaigns" heroCopy="If strategy is your brand’s intellect, then creativity is its persona. We’ll ensure your brand makes instant chemistry with customers, even in an over communicated world."/>

        <div className="List-container">
            <div className="TitleTextButton app-container branding-title">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>BROCHURES</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={BROCHURES_DATA} LIST_NAME={"BROCHURES"} pageColor={colorIndex[1]} />
            </div>
        </div>

        <div className="List-container">
            <div className="TitleTextButton app-container branding-title">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>SHORTLISTED CAMPAIGNS</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={SHORTLISTED_DATA} LIST_NAME={"SHORTLISTED"} pageColor={colorIndex[1]} />
            </div>
        </div>

        <div className="List-container">
            <div className="TitleTextButton app-container branding-title">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>NEWSPAPER</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={NEWSPAPER_DATA} LIST_NAME={"NEWSPAPER"} pageColor={colorIndex[1]} />
            </div>
        </div>


    </Work>
  )
}