import { React, useEffect, useLayoutEffect, useRef, useState } from "react";
 

// Nextjs components
import Head from "next/head";
import Image from "next/image";

// GSAP
import { gsap } from "gsap/dist/gsap";

import Worknav from './worknav'
import Footer from '../../components/footer/footer';

 
import { useRouter } from 'next/router' 



// work page color definition
export const colorIndex = {
    0 : "#af37d9",
    1 : "#de477e",
    2 : "#f2ad45",
    3 : "#3ab8c9",
    4 : "#3b33b3"
}

export const pageIndex = {
    "branding" : 0,
    "campaigns" : 1,
    "content" : 2,
    "strategy" : 3,
    "workshops" : 4
}

export const pageIndexInv = {
    0 : "branding",
    1 :"campaigns",
    2 : "content",
    3 : "strategy",
    4 : "workshops"
}

export function WorkHero(prop){

    return(
        <>
            <Head>
                <title>Work: {prop.title}</title>
            </Head>

            <div className="WorkHero">
                <div className="WorkHero-wrapper">
                    <h1 className="WorkHero-title HomeTitle">
                        <span className="HomeTitle-title">{prop.title}</span>
                    </h1>
                    <h2 className="WorkHero-subtitle app-text--large">
                        <p>
                            {(prop.heroCopy)}
                        </p>
                    </h2>
                </div>
            </div>
        </>
    )
}

const LIST_WITH_POPUP = ["LOGO", "STATIONERY", "GUIDELINES", "BROCHURES", "CAMPAIGN", "MEDIA"];
const LIST_WITH_PDF = ["LOGO", "STATIONERY", "GUIDELINES", "BROCHURES"];
const LIST_WITH_IMG = ["CAMPAIGN", "MEDIA"];
const LIST_WITH_RECT_STYLE = ["STATIONERY", "GUIDELINES", "BROCHURES", "CAMPAIGN", "MEDIA"];
const LIST_WITH_DOUBLE_IMAGE = [];

function GallaryListitem(props){

    if ( props.href === undefined ) props.href = "/"
    const rootElRef = useRef();
    const executed = useRef(0);

    const cl_name = `.list-${props.LIST_NAME}-${props.index}`;

    const [popup, setPopup] = useState();

    useLayoutEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            if ( LIST_WITH_POPUP.indexOf(props.LIST_NAME) !== -1 ){

                // on click popup
                document.querySelector(cl_name).addEventListener("click", (e)=>{

                    setPopup(
                        (LIST_WITH_PDF.indexOf(props.LIST_NAME) !== -1 || !(LIST_WITH_IMG.indexOf(props.LIST_NAME) !== -1)) ?
                            <div className="Popup-pdf">
                                <embed
                                    src={props.pdfSrc}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            :
                            <div className="Popup-img">
                                {LIST_WITH_DOUBLE_IMAGE.indexOf(props.LIST_NAME) !== -1 ?
                                <Image src={ props.imgUrl[1]} alt={ props.label } width="400" height="400" /> :
                                <Image src={ props.imgUrl } alt={ props.label } width="400" height="400" />}
                            </div>
                    );

                    document.querySelector(cl_name+" .List-popup").classList.remove("popup-hidden");
                    document.querySelector(".Header").classList.add("Header-under-element");
                    e.preventDefault();
                })

                // remove popup
                let popup_r_fn = (e)=>{
                    document.querySelector(cl_name+" .List-popup").classList.add("popup-hidden");
                    document.querySelector(".Header").classList.remove("Header-under-element");
                    e.cancelBubble = true;
                }

                // adding listeners for removal
                document.querySelector(cl_name+" .Popup-cross").addEventListener("click", popup_r_fn)
                document.querySelector(cl_name+" .List-popup").addEventListener("click", popup_r_fn)

            }

            executed.current += 1;
        }
    }, [])

    return(
        <div className={`List-item ${LIST_WITH_RECT_STYLE.indexOf(props.LIST_NAME) !== -1 ? 'rect' : 'simple'}-list-item ${props.LIST_NAME}-list-item list-${props.LIST_NAME}-${props.index}`} ref={rootElRef} >
            <div className="WorksListItem in-view" >
                <div className={`AppImage fit-${LIST_WITH_RECT_STYLE.indexOf(props.LIST_NAME) !== -1 ? 'cover' : 'contain'} loaded plane WorksListItem-thumbnail`}>
                    <div className="AppImage-overlay"></div>
                    {/* <picture> */}
                        {
                            LIST_WITH_DOUBLE_IMAGE.indexOf(props.LIST_NAME) !== -1 ?
                                <Image fill src={ props.imgUrl[0] } alt={ props.label } className="AppImage-image" />
                                :
                                <Image fill src={ props.imgUrl } alt={ props.label } className="AppImage-image" />

                        }

                    {/* </picture> */}
                </div>
                <h3 className="WorksListItem-title u-textUppercase app-title--small">{ props.label }</h3>
            </div>
            <div className="List-popup popup-hidden">
                <div className="Popup-frame">
                    <div className="Popup-cross">close <img alt="cross" src="/assets/delete-sign--v2.png"/></div>
                    {popup}
                </div>
            </div>
        </div>
    )
}

export function GallaryList(props){

    const gallaryData = useRef([]);

    const executed = useRef(0);
    const work_el_added_count = useRef(0);
    const [GallaryList, setGallaryList] = useState([]);

    const makeListItemsAnimated = () => {

        document.querySelectorAll(`.${props.LIST_NAME}-list-item`).forEach((listItemEl) => {

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
        <div className={`List-items ${props.LIST_NAME}-list`}  style={{"--color":(props.pageColor)}}>
            {GallaryList}
        </div>
     )
}

export default function Work({ children }) {
  const router = useRouter()
  const executed = useRef(0)
  
  // Better path extraction that handles query params and trailing slashes
  const currentPath = router.asPath.split('?')[0] // Remove query params
  const pathParts = currentPath.split('/').filter(part => part !== '') // Split and remove empty parts
  const currentPage = pathParts[pathParts.length - 1] || 'branding' // Get last part or default
  
  const [activeIndex, setActiveIndex] = useState(pageIndex[currentPage] ?? 0)

  console.log('Current path:', router.asPath) // Debugging
  console.log('Current page:', currentPage) // Debugging
  console.log('Active index:', activeIndex) // Debugging
  console.log('Current color:', colorIndex[activeIndex]) // Debugging

  useEffect(() => {
    if (executed.current === 0) {
      // Redirect to branding if at /work
      if (currentPath === '/work') {
        router.push('/work/branding')
      }
      executed.current++
    }
  }, [currentPath, router])

  return (
    <main 
      className="Work-page-container" 
      style={{ '--page-color': colorIndex[activeIndex] }}
      data-scroll-container
    >
      <Worknav activeIndex={activeIndex} />
      {children}
      <Footer />
    </main>
  )
}