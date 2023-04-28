// React
import { React, useEffect, useLayoutEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Image from "next/image";

import Work, { WorkHero } from '.'

// GSAP
import { gsap } from "gsap/dist/gsap";

// vimeo
import Player from '@vimeo/player';

const LIST_WITH_POPUP = ["BROCHURES", "GUIDELINES"];

// Fragmented Components
function GallaryListitem(props){

    if ( props.href === undefined ) props.href = "/"
    const rootElRef = useRef();
    const executed = useRef(0);

    const cl_name = `.list-${props.LIST_NAME}-${props.index}`;

    useLayoutEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            // if ( LIST_WITH_POPUP.findIndex(props.LIST_NAME) !== -1 ) {

                // adding the popup
                document.querySelector(cl_name).addEventListener("click", (e)=>{
                    document.querySelector(cl_name+" .List-popup").classList.remove("popup-hidden");
                    document.querySelector(".Header").classList.add("Header-under-element");
                    e.preventDefault();
                })

                // popup remove fn
                let popup_r_fn = (e)=>{
                    document.querySelector(cl_name+" .List-popup").classList.add("popup-hidden");
                    document.querySelector(".Header").classList.remove("Header-under-element");
                    e.cancelBubble = true;
                }

                // removing the popup
                document.querySelector(cl_name+" .Popup-cross").addEventListener("click", popup_r_fn)
                document.querySelector(cl_name+" .List-popup").addEventListener("click", popup_r_fn)

            // }


            executed.current += 1;
        }
    }, [])

    return(
        <div className={`List-item ${props.LIST_NAME}-list-item list-${props.LIST_NAME}-${props.index}`} ref={rootElRef} >
                <div className="WorksListItem in-view" >
                    <div className="AppImage fit-contain loaded plane WorksListItem-thumbnail">
                        <div className="AppImage-overlay"></div>
                        <picture>
                            { props.source }
                            <Image fill src={ props.imgUrl } alt={ props.label } className="AppImage-image" />
                        </picture>
                    </div>
                    <h3 className="WorksListItem-title u-textUppercase app-title--small">{ props.label }</h3>
                </div>
            <div className="List-popup popup-hidden">
                <div className="Popup-frame">
                    <div className="Popup-cross">close <img alt="cross" src="/assets/delete-sign--v2.png"/></div>
                    <div className="Popup-pdf">
                        <embed
                            src={props.pdfSrc}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function GallaryList(props){

    const gallaryData = useRef([]);



    const executed = useRef(0);
    const work_el_added_count = useRef(0);
    const [GallaryList, setGallaryList] = useState([]);

    // Functions
    const makeListItemsAnimated = () => {

        document.querySelectorAll(".List-item").forEach((listItemEl) => {

            listItemEl.querySelector(".AppImage-overlay").style.setProperty("opacity", 1);
            gsap.set(listItemEl.querySelector(".WorksListItem-title"), { opacity:0, x:"20%" });
            gsap.set(listItemEl.querySelector(".WorksListItem-details"), { opacity:0, x:"20%" });

            const worksItemScrollTimeLine = gsap.timeline({ defaults:{ },
                scrollTrigger:{
                    trigger: listItemEl,
                    scroller: (window.innerWidth > 1024 ? "[data-scroll-container]" : undefined),
                    start: "top bottom-=15%",
                    end: "top 30%",
                }
            });

            worksItemScrollTimeLine
                .fromTo(listItemEl.querySelector(".AppImage-overlay"), { x:"0%" }, { duration: 0.5, x:"-200%", ease:"none", onComplete:()=>{
                    gsap.set(listItemEl.querySelector(".AppImage-overlay"), { opacity: 0, onComplete:()=>{
                        listItemEl.querySelector(".AppImage-overlay").style.removeProperty("transform");
                    }})
                }})
                .fromTo(listItemEl.querySelector(".WorksListItem-title"), { opacity:0, x:"20%" }, { opacity:1, x:"0%" }, "<0.05")
                .fromTo(listItemEl.querySelector(".WorksListItem-details"), { opacity:0, x:"20%" }, { opacity:1, x:"0%" }, "<0.1");
        })
    }

    const waitUntilLocomotiveTrue = (props) => {

        props.s_trigger_anim(() => {

            let l_s = document.querySelector(".Load-screen");
            let load_s_t = 2520; // loading screen time

            let intervalRef = setInterval(() => {

                let c_s_t, s_t_a;

                try {
                    c_s_t = getComputedStyle(l_s).getPropertyValue("transform");
                    s_t_a = parseInt(c_s_t.split("(")[1].split(")")[0].split(",")[5]*(-1)) > window.innerHeight*0.6;
                } catch (error) { }


                if ( work_el_added_count.current > 1 ){
                    c_s_t = null;
                    s_t_a = true;
                }

                if (window.innerWidth > 1024){

                    if ( c_s_t === "none"  ) return;
                    if ( props.locomotiveScrollInstance.current === undefined || !( s_t_a ) ) return;

                    props.locomotiveScrollInstance.current.update();

                } else {

                    if ( c_s_t === "none"  ) return;
                    if ( !( s_t_a ) ) return;

                }


                // Adding the animation
                makeListItemsAnimated();

                work_el_added_count.current++;
                if ( props.locomotiveScrollInstance.current !== undefined ) clearInterval(intervalRef);

            // }, (window.innerWidth > 1024) ? 0 : load_s_t*0.5);
            }, 0);

        });


    }

    const createWorksComponent = () => {
        setGallaryList([]);
        let localGallaryList = [];
        gallaryData.current.forEach((data, i) => {
            localGallaryList.push(<GallaryListitem
                            key={i}
                            index={i}
                            LIST_NAME={props.LIST_NAME}
                            href={data[0]}
                            imgUrl={data[1]}
                            label={data[2]}
                            pdfSrc={data[3]}
                            imgSrc={data[4]}
                        />);

        });

        setGallaryList(localGallaryList);
    }

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( executed.current < 1){

            // Make Works Component
            if (true){
                gallaryData.current = props.gallaryData;
                createWorksComponent();
            }

            executed.current += 1;
        }
    }, [])


    useEffect(() => {

        // Locomotive with scrollTrigger
        if ( true ){
            waitUntilLocomotiveTrue(props.parentProp);
            props.parentProp.cursor_events_listen();
        }

    }, [GallaryList])

     return (
        <div className={`List-items ${props.LIST_NAME}-list`}>
            {GallaryList}
        </div>
     )
}

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
            <div className="TitleTextButton app-container">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>LOGO DESIGNS</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={LOGO_DATA} LIST_NAME={"LOGO"} />
            </div>

            <div className="TitleTextButton app-container">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>STATIONERY</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={STATIONERY_DATA} LIST_NAME={"STATIONERY"} />
            </div>

            <div className="TitleTextButton app-container">
                <div className="TitleTextButton-wrapper">
                    <div className="TitleTextButton-wrapperSmall">
                        <p className='TitleTextButton-text app-text--large' style={{fontSize:"4rem"}}>GUIDELINES</p>
                    </div>
                </div>
            </div>
            <div className="List-wrapper">
                <GallaryList parentProp={props} gallaryData={GUIDELINES_DATA} LIST_NAME={"GUIDELINES"} />
            </div>

        </Work>
    )
}