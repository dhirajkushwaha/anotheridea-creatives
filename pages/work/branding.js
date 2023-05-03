// React
import { React } from "react";


import Work, { WorkHero, GallaryList, colorIndex } from '.';



const LOGO_DATA = [
    ["/", "/assets/truster/logo (1).png"],
    ["/", "/assets/truster/logo (2).png"],
    ["/", "/assets/truster/logo (3).png"],
    ["/", "/assets/truster/logo (4).png"],
    ["/", "/assets/truster/logo (5).png"],
    ["/", "/assets/truster/logo (6).png"],
    ["/", "/assets/truster/logo (7).png"],
    ["/", "/assets/truster/logo (8).png"],
    ["/", "/assets/truster/logo (9).png"],
    ["/", "/assets/truster/logo (10).png"],
    ["/", "/assets/truster/logo (11).png"]
]

const STATIONERY_DATA = [
    ["/", "/assets/stationeryimg/gbd.png", "Gravah", "/assets/stationerypdf/GBD Logo Option.pdf"],
    ["/", "/assets/stationeryimg/mani.png", "Mani", "/assets/stationerypdf/Mani Group Stationary _ Giveaway.pdf"],
    ["/", "/assets/stationeryimg/olr.png", "OLR", "/assets/stationerypdf/OLR Stationary.pdf"],
    ["/", "/assets/stationeryimg/realplus.png", "realplus", "/assets/stationerypdf/real+ Stationary.pdf"],
]

const GUIDELINES_DATA = [
    ["/", "/assets/guidelinesimg/vibe.png", "Vibe", "/assets/guidelinespdf/Basic Ref_Vibe Brand guideline Low.pdf"],
    ["/", "/assets/guidelinesimg/olr.png", "OLR", "/assets/guidelinespdf/Elaborate Version_OLR Brand Guidelines.pdf"],
    ["/", "/assets/guidelinesimg/rubberwala.png", "Rubberwala", "/assets/guidelinespdf/Mid-Level Ref_Rubberwala Brand Manual 2022.pdf"],
]

export default function Branding(props) {
    return (
        <Work>
            <WorkHero title="Branding" heroCopy="We help co-create brands, not only advertise your projects. Consider us the Google Maps equivalent for your brand.
            We’ll enable your brand to not only set the right success destinations, but also pick the most optimal routes to get to these goals." />
            <div className="List-container">
                <div className="TitleTextButton app-container branding-title">
                    <div className="TitleTextButton-wrapper">
                        <div className="TitleTextButton-wrapperSmall">
                            <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>LOGOS</p>
                        </div>
                    </div>
                </div>
                <div className="List-wrapper">
                    <GallaryList parentProp={props} gallaryData={LOGO_DATA} LIST_NAME={"LOGO"} pageColor={colorIndex[0]} />
                </div>
            </div>

            <div className="List-container">
                <div className="TitleTextButton app-container branding-title">
                    <div className="TitleTextButton-wrapper">
                        <div className="TitleTextButton-wrapperSmall">
                            <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>STATIONERY</p>
                        </div>
                    </div>
                </div>
                <div className="List-wrapper">
                    <GallaryList parentProp={props} gallaryData={STATIONERY_DATA} LIST_NAME={"STATIONERY"} pageColor={colorIndex[0]} />
                </div>
            </div>

            <div className="List-container">
                <div className="TitleTextButton app-container branding-title">
                    <div className="TitleTextButton-wrapper">
                        <div className="TitleTextButton-wrapperSmall">
                            <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>GUIDELINES</p>
                        </div>
                    </div>
                </div>
                <div className="List-wrapper">
                    <GallaryList parentProp={props} gallaryData={GUIDELINES_DATA} LIST_NAME={"GUIDELINES"} pageColor={colorIndex[0]} />
                </div>
            </div>

        </Work>
    )
}