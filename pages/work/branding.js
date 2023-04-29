// React
import { React, useEffect, useLayoutEffect, useRef, useState } from "react";


import Work, { WorkHero, GallaryList } from '.'



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
    ["/", "/assets/truster/logo (11).png"],
    ["/", "/assets/truster/logo (12).png"],
    ["/", "/assets/truster/logo (13).png"],
    ["/", "/assets/truster/logo (14).png"],
    ["/", "/assets/truster/logo (15).png"],
    ["/", "/assets/truster/logo (16).png"],
    ["/", "/assets/truster/logo (17).png"],
    ["/", "/assets/truster/logo (18).png"],
    ["/", "/assets/truster/logo (19).png"],
    ["/", "/assets/truster/logo (20).png"],
    ["/", "/assets/truster/logo (21).png"],
    ["/", "/assets/truster/logo (22).png"],
    ["/", "/assets/truster/logo (23).png"],
    ["/", "/assets/truster/logo (24).png"],
    ["/", "/assets/truster/logo (25).png"],
    ["/", "/assets/truster/logo (26).png"],
    ["/", "/assets/truster/logo (27).png"],
    ["/", "/assets/truster/logo (28).png"],
    ["/", "/assets/truster/logo (29).png"],
    ["/", "/assets/truster/logo (30).png"],
    ["/", "/assets/truster/logo (31).png"],
    ["/", "/assets/truster/logo (32).png"],
    ["/", "/assets/truster/logo (33).png"],
    ["/", "/assets/truster/logo (34).png"],
    ["/", "/assets/truster/logo (35).png"],
    ["/", "/assets/truster/logo (36).png"],
    ["/", "/assets/truster/logo (37).png"],
    ["/", "/assets/truster/logo (38).png"],
    ["/", "/assets/truster/logo (39).png"],
    ["/", "/assets/truster/logo (40).png"],
    ["/", "/assets/truster/logo (41).png"],
    ["/", "/assets/truster/logo (42).png"],
    ["/", "/assets/truster/logo (43).png"],
    ["/", "/assets/truster/logo (44).png"],
    ["/", "/assets/truster/logo (45).png"],
    ["/", "/assets/truster/logo (46).png"],
    ["/", "/assets/truster/logo (47).png"],
    ["/", "/assets/truster/logo (48).png"],
    ["/", "/assets/truster/logo (49).png"],
    ["/", "/assets/truster/logo (50).png"],
    ["/", "/assets/truster/logo (51).png"],
    ["/", "/assets/truster/logo (52).png"],
    ["/", "/assets/truster/logo (53).png"],
    ["/", "/assets/truster/logo (54).png"],
    ["/", "/assets/truster/logo (55).png"],
    ["/", "/assets/truster/logo (56).png"],
    ["/", "/assets/truster/logo (57).png"],
    ["/", "/assets/truster/logo (58).png"],
    ["/", "/assets/truster/logo (59).png"],
    ["/", "/assets/truster/logo (60).png"],
    ["/", "/assets/truster/logo (61).png"],
    ["/", "/assets/truster/logo (62).png"],
    ["/", "/assets/truster/logo (63).png"],
    ["/", "/assets/truster/logo (64).png"],
    ["/", "/assets/truster/logo (65).png"],
    ["/", "/assets/truster/logo (66).png"],
    ["/", "/assets/truster/logo (67).png"],
    ["/", "/assets/truster/logo (68).png"],
    ["/", "/assets/truster/logo (69).png"],
]

const STATIONERY_DATA = [
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "GBD", "/assets/stationerypdf/GBD Logo Option.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Mani", "/assets/stationerypdf/Mani Group Stationary _ Giveaway.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "OLR", "/assets/stationerypdf/OLR Stationary.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "real+", "/assets/stationerypdf/real+ Stationary.pdf"],
]

const GUIDELINES_DATA = [
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Vibe", "/assets/guidelinespdf/Basic Ref_Vibe Brand guideline Low.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "OLR", "/assets/guidelinespdf/Elaborate Version_OLR Brand Guidelines.pdf"],
    ["/", "https://img.icons8.com/material-rounded/96/FFFFFF/pdf-2.png", "Rubberwala", "/assets/guidelinespdf/Mid-Level Ref_Rubberwala Brand Manual 2022.pdf"],
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
                            <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>LOGO DESIGNS</p>
                        </div>
                    </div>
                </div>
                <div className="List-wrapper">
                    <GallaryList parentProp={props} gallaryData={LOGO_DATA} LIST_NAME={"LOGO"} />
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
                    <GallaryList parentProp={props} gallaryData={STATIONERY_DATA} LIST_NAME={"STATIONERY"} />
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
                    <GallaryList parentProp={props} gallaryData={GUIDELINES_DATA} LIST_NAME={"GUIDELINES"} />
                </div>
            </div>

        </Work>
    )
}