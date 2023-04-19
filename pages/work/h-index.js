// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Image from "next/image";

// GSAP
import { gsap } from "gsap/dist/gsap";

// Custom Components
import Footer from "../../components/footer/footer"
import ReadyToMake from "../../components/readytomake.js";

// vimeo
import Player from '@vimeo/player';


// Fragmented Components
function WorksListItem(props){

    if ( props.href === undefined ) props.href = "/"
    const rootElRef = useRef();
    const executed = useRef(0);

    const cl_name = `.list-${props.index}`

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            let iframe = document.querySelector(cl_name+' iframe');
            let player = new Player(iframe);

            // adding the popup
            document.querySelector(cl_name).addEventListener("click", (e)=>{
                document.querySelector(cl_name+" .List-popup").classList.remove("popup-hidden");
                document.querySelector(".Header").classList.add("Header-under-element");
                e.preventDefault();

                // player.play();
            })

            // popup remove fn
            let popup_r_fn = (e)=>{
                document.querySelector(cl_name+" .List-popup").classList.add("popup-hidden");
                document.querySelector(".Header").classList.remove("Header-under-element");
                e.cancelBubble = true;

                player.pause();
            }

            // player.on('ended', function() {
            //     popup_r_fn();
            // });

            // removing the popup
            document.querySelector(cl_name+" .Popup-cross").addEventListener("click", popup_r_fn)
            // removing the popup
            document.querySelector(cl_name+" .List-popup").addEventListener("click", popup_r_fn)


            executed.current += 1;
        }
    }, [])



    return(
        <div className={`List-item list-${props.index}`} ref={rootElRef} >
            {/* <Link href={props.href}> */}
                {/* <a href={props.href} className="WorksListItem in-view" > */}
                <div className="WorksListItem in-view" >
                    {/* <Curtains>
                        <BasicPlane> */}
                            <div className="AppImage fit-contain fit-cover loaded plane WorksListItem-thumbnail">
                                <div className="AppImage-overlay"></div>
                                <picture>
                                    { props.source }
                                    <Image fill src={ props.imgUrl } alt={ props.label } className="AppImage-image" />
                                </picture>
                            </div>
                        {/* </BasicPlane>
                    </Curtains> */}
                    <h3 className="WorksListItem-title u-textUppercase app-title--small">{ props.label }</h3>
                    <div className="AppImage WorksListItem-details app-text--small">
                        <span className="WorksListIem-detail u-textUppercase app-text--small">Director:</span>
                        <span className="WorksListIem-detail u-textUppercase app-text--small">{ props.dirLabel }</span>
                    </div>
                </div>
                {/* </a> */}
            {/* </Link> */}

            <div className="List-popup popup-hidden">
                <div className="Popup-frame">
                    <div className="Popup-cross">close <img alt="cross" src="/assets/delete-sign--v2.png"/> </div>
                    <div className="Popup-video">
                        <iframe src={props.videoSrc} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WorksList(props){

    const worksDetailsList = [
                                ["/", "/assets/works_thumbnail/Scram-411---Royal-Enfield.jpg", "Royal Enfield Scram 411", "Lloyd Baptista", "", "https://player.vimeo.com/video/703566550?h=9420574f64&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Ola-Electric-MoveOS3--.jpg", "Ola Proximity Unlock", "Ken Rolston", "", "https://player.vimeo.com/video/765214457?h=b5716ad29c&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/TATA-YODHA-Cement.jpg", "Tata Yodha 2.0", "Lloyd Baptista", "", "https://player.vimeo.com/video/757567353?h=48603657bf&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Amazon-Rakhi.jpg", "Amazon Kheer", "Prosit Roy", "", "https://player.vimeo.com/video/674290692?h=6042c3a705&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Minnal-Murali-Promo--.jpg", "Minnal Murali ft. Khali", "Vasan Bala", "", "https://player.vimeo.com/video/674292817?h=8b0a629b30&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/Sensodyne---Multi-Care.jpg", "Sensodyne Multi Care", "Cherine Khoury", "", "https://player.vimeo.com/video/770176075?h=1c32d68f28&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Amazon-Prime-Day.jpg", "Amazon Prime Day", "Vikrant Yadav", "", "https://player.vimeo.com/video/748676041?h=f88346ac9f&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Amazon-Heroes-.jpg", "Amazon Great Indian Heroes", "Prosit Roy", "", "https://player.vimeo.com/video/674292092?h=e6360723d7&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Mi-TV.jpg", "MI TV", "Adam Johnson", "", "https://player.vimeo.com/video/674301398?h=515f40e64f&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Myntra-Unskippable.jpg", "Myntra Be Unskippable", "Sachin Kotre", "", "https://player.vimeo.com/video/674300863?h=29cd87ab5c&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/The-Sleep-Company.jpg", "The Sleep Company", "Jeet Lotia", "", "https://player.vimeo.com/video/674831888?h=74c3bf7e11&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Motorolla-Ink.jpg", "MOTO g82", "Teodora Chingarova", "", "https://player.vimeo.com/video/746099784?h=ac5d0410ff&amp;quality=240p"],


                                ["/", "/assets/works_thumbnail/GOA-Tourism.jpg", "Goa Tourism", "Jeet Lotia", "", "https://player.vimeo.com/video/674301748?h=76d37c804d&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Bajaj-Allianz-Father_s-Day.jpg", "Bajaj Allianz Father’s Day", "Jeet Lotia", "", "https://player.vimeo.com/video/674306213?h=e692543fcc&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Ola-Electric-MoveOS3--005.jpg", "Ola Party Mode", "Ken Rolston", "", "https://player.vimeo.com/video/765214430?h=51f34f2e86&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Minnal-Murali-Promo-Khali.jpg", "Minnal Murali ft. Yuvraj Singh", "Vasan Bala", "", "https://player.vimeo.com/video/674295179?h=a9531fbb58&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/TATA-YODHA-Water.jpg", "Tata Yodha 2.0", "Lloyd Baptista", "", "https://player.vimeo.com/video/757724269?h=2e1be31da2&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Reliance-Smart-Tyohar-.jpg", "Reliance Smart Tyohaar", "Jeet Lotia", "", "https://player.vimeo.com/video/674314923?h=35de1ffe29&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/JioMart-FPVS--SOAP.jpg", "Jio Mart FPVS", "Vibhu Puri", "", "https://player.vimeo.com/video/754205045?h=4c0fe88ff1&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Platinum-Day-Of-Love-.jpg", "Platinum Day of Love", "Puneet Prakash", "", "https://player.vimeo.com/video/674314252?h=f8aeae0703&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Ola-Electric--.jpg", "Ola S1 Pro", "Jeet Lotia", "", "https://player.vimeo.com/video/754220291?h=f2c9e7e7ca&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/Sensodyne- Multi Care Vieatnam.jpg", "Sensodyne Multi Care", "Cherine Khoury", "", "https://player.vimeo.com/video/770176203?h=4b256b6d9a&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/ISHQ-FM.jpg", "ISHQ FM", "Sarah Dcosta", "", "https://player.vimeo.com/video/674304657?h=6e22cf2c2c&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/JioMart-FPVS--Birthday-Party.jpg", "Jio Mart FPVS", "Jeet Lotia", "", "https://player.vimeo.com/video/750972931?h=9afe4cd65d&amp;quality=240p"],


                                ["/", "/assets/works_thumbnail/Ola-Electric-MoveOS--003.jpg", "Ola Vintage Mood", "Ken Rolston", "", "https://player.vimeo.com/video/765214361?h=51f34f2e86&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/TATA-YODHA-MILK.jpg", "Tata Yodha 2.0", "Lloyd Baptista", "", "https://player.vimeo.com/video/757722678?h=2e1be31da2&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Sensodyne-Deep-Clean- Philipines.jpg", "Sensodyne Deep Clean", "Cherine Khoury", "", "https://player.vimeo.com/video/770175299?h=4b256b6d9a&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Glucond-Mango-DCUT.jpg", "GLUCON-D", "Vibhu Puri", "", "https://player.vimeo.com/video/674323442?h=76d37c804d&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Ola-Electric-MoveOS3--000.jpg", "OLA BOLT MODE", "Ken Rolston", "", "https://player.vimeo.com/video/765214389?h=4c0fe88ff1&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/TATA-YODHA-Fruit.jpg", "Tata Yodha 2.0", "Lloyd Baptista", "", "https://player.vimeo.com/video/757718298?h=a9531fbb58&amp;quality=240p"],
                                ["/", "/assets/works_thumbnail/Minnal-Murali-Promo---Youvraj-Singh.jpg", "Minnal Murali", "Vasan Bala", "", "https://player.vimeo.com/video/674296676?h=f2c9e7e7ca&amp;quality=240p"],

                                ["/", "/assets/works_thumbnail/Sensodyne Fresh Mint - Indoneshia.jpg", "Sensodyne Fresh Mint", "Cherine Khoury", "", "https://player.vimeo.com/video/770175081?h=a9531fbb58&amp;quality=240p"],
                            ];



    const executed = useRef(0);
    const work_el_added_count = useRef(0);
    const [worksList, setWorksList] = useState([]);

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

            // gsap.set(listItemEl.querySelector(".AppImage-overlay"), { x:"0%" });
            // gsap.set(listItemEl.querySelector(".WorksListItem-title"), { opacity:0, x:"20%" });
            // gsap.set(listItemEl.querySelector(".WorksListItem-details"), { opacity:0, x:"20%" });
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

    const createWorksComponent = (filter) => {
        setWorksList([]);
        let localWorksList = [];

        if (filter == "all"){
            worksDetailsList.forEach((work, index) => {
                localWorksList.push(<WorksListItem
                                href={work[0]}
                                imgUrl={work[1]}
                                label={work[2]}
                                dirLabel={work[3]}
                                videoSrc={work[5]}
                                index={index}
                                key={index}
                            />);

            });
        } else {
            worksDetailsList.forEach((work, index) => {
                if ( filter == work[4] ){
                    localWorksList.push(<WorksListItem
                                    href={work[0]}
                                    imgUrl={work[1]}
                                    label={work[2]}
                                    dirLabel={work[3]}
                                    videoSrc={work[5]}
                                    index={index}
                                    key={index}
                                />);
                }
            });
        }

        setWorksList(localWorksList);
    }

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( executed.current < 1){

            // Make Works Component
            if (true){
                createWorksComponent("all");

                document.querySelectorAll(".Listfilter-listItem").forEach(listfilterItem => {
                    listfilterItem.addEventListener("click", (e)=>{
                        createWorksComponent(listfilterItem.getAttribute("data-filter"));
                    })
                });
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

    }, [worksList])

     return (
        <div className="List-items">
            {worksList}
        </div>
     )
}

// Page Component
export default function hWork(props){

    const executed = useRef(0);


    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            // ListFilter Listener
            if ( true ){
                const ListfilterItem = document.querySelectorAll(".Listfilter-listItem");
                var LastFilterItem = document.querySelector(".Listfilter-listItem.is_active")

                ListfilterItem.forEach(filterItem => {
                    filterItem.addEventListener("click", (e)=>{
                        LastFilterItem.classList.remove("is_active");
                        filterItem.classList.add("is_active");
                        LastFilterItem = filterItem;
                    });
                });

            }

            executed.current += 1
        }
    }, [])

    return(
        <div className="Work-page" data-scroll-container>
            <Head>
				<title>Work - Another Idea</title>
			</Head>

            <section className="Works-Listfilter">
                <div className="Listfilter-wrapper">
                    <div className="Listfilter-list">
                        <div className="Listfilter-title">Explore :</div>
                        <div className="Listfilter-listItem is_active" data-filter="all" >
                            <div className="Listfilter-listItemLabel">
                                All
                            </div>
                        </div>
                        <div className="Listfilter-listItem" data-filter="automobile">
                            <div className="Listfilter-listItemLabel">
                                Automobile
                            </div>
                            <span className="Listfilters-listItemCount">01</span>
                        </div>
                        <div className="Listfilter-listItem" data-filter="food">
                            <div className="Listfilter-listItemLabel">
                                Food
                            </div>
                            <span className="Listfilters-listItemCount">01</span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="beauty">
                            <div className="Listfilter-listItemLabel">
                                Beauty
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="FMCG">
                            <div className="Listfilter-listItemLabel">
                                FMCG
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable" data-filter="drama">
                            <div className="Listfilter-listItemLabel">
                                Drama
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                        <div className="Listfilter-listItem is-disable"  data-filter="humour">
                            <div className="Listfilter-listItemLabel">
                                Humour
                            </div>
                            <span className="Listfilters-listItemCount"></span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="Works-List">
                <div className="List-wrapper">
                    <WorksList parentProp={props} />
                </div>
                <ReadyToMake />
            </section>
            <Footer></Footer>
        </div>
    )
}