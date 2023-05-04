import React from 'react'

import Work, { WorkHero, GallaryList, colorIndex } from '.'

const BROCHURES_DATA = [
    ["/", "/assets/brochuresimg/auris.png", "Auris Serenity", "/assets/brochurespdf/Auris Serenity brochure.pdf"],
    ["/", "/assets/brochuresimg/ibs.png", "Indiabulls Sky Forest", "/assets/brochurespdf/IBS Bro.pdf"],
    ["/", "/assets/brochuresimg/quantum.png", "Hiranandani Quantum", "/assets/brochurespdf/Quantum E-Bro.pdf"],
    ["/", "/assets/brochuresimg/rodas.png", "Rodas Enclave", "/assets/brochurespdf/Rodas brochure.pdf"],
    ["/", "/assets/brochuresimg/montana.png", "Sheth Montana", "/assets/brochurespdf/Sheth - Montana Brochure.pdf"],
    ["/", "/assets/brochuresimg/cnergy.png", "Sheth Cnergy", "/assets/brochurespdf/Sheth Cnergy - Commercial brochure.pdf"],
]

const CAMPAIGN_DATA = [
    ["/", "/assets/shortlistedimg/Picture 3 A.jpg", "Hiranandani"],
    ["/", "/assets/shortlistedimg/Picture 4 A.jpg", "Omkar"],
    ["/", "/assets/shortlistedimg/Picture 12 A.jpg", "Vasnat Oasis"],
    ["/", "/assets/shortlistedimg/Picture 20 A.jpg", "The Times of India"],
    ["/", "/assets/shortlistedimg/Picture 26 A.jpg", "Alcove"],
    ["/", "/assets/shortlistedimg/Picture 32 A.jpg", "Omaxe"],
    ["/", "/assets/shortlistedimg/Picture 34 A.png", "Aurobindu"],
    ["/", "/assets/shortlistedimg/Picture 37 A.jpg", "Gaurse"],
    ["/", "/assets/shortlistedimg/Picture 39 A.jpg", "IRIS Building for life"],
    ["/", "/assets/shortlistedimg/Picture 58 A.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture7.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture9.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture17.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture23.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture24.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture25.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture41.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture44.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture47.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture50.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture63.jpg", "Sheth Creators"],
    ["/", "/assets/shortlistedimg/Picture20_Pixelate.jpg", "Sheth Creators"],
]

const MEDIA_DATA = [
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
                        <p className='TitleTextButton-text app-text--large'>BROCHURES</p>
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
                        <p className='TitleTextButton-text app-text--large'>CAMPAIGNS</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={CAMPAIGN_DATA} LIST_NAME={"CAMPAIGN"} pageColor={colorIndex[1]} />
            </div>
        </div>

        <div className="List-container">
            <div className="TitleTextButton app-container branding-title">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large'>MEDIA</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={MEDIA_DATA} LIST_NAME={"MEDIA"} pageColor={colorIndex[1]} />
            </div>
        </div>


    </Work>
  )
}