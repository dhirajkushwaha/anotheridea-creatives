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
    ["/", ["/assets/shortlistedimg/Picture 3 A.jpg", "/assets/shortlistedimg/Picture 3 B.jpg"], "Hiranandini", "/assets/brochurespdf/Auris Serenity brochure.pdf"],
]

const NEWSPAPER_DATA = [
    ["/", "/assets/newspaperimg/Picture2.jpg", ""],
    ["/", "/assets/newspaperimg/Picture15.jpg", ""],
    ["/", "/assets/newspaperimg/Picture22.jpg", ""],
    ["/", "/assets/newspaperimg/Picture42.jpg", ""],
    ["/", "/assets/newspaperimg/Picture51.jpg", ""],
    ["/", "/assets/newspaperimg/Picture53.jpg", ""],
    ["/", "/assets/newspaperimg/Picture56.jpg", ""],
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