// Style
import "../styles/globals.css";
import "../styles/style.css";

// Locomotive style
import "../node_modules/locomotive-scroll/dist/locomotive-scroll.css"

// React
import { React, useEffect, useRef, useState } from "react";

// Next Component
import Link from "next/link";

import { useRouter } from "next/router"
// import Router from "next/router";

// Gsap
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";


// Splitingjs
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
// import Splitting from "splitting";

// vimeo
import Player from '@vimeo/player';

// swiper slider
import { useSwiper } from 'swiper/react';


// Fractional Component
function NavItem(props){

    return(
    <div className="Menu-navItem">
            <div className="Menu-navItemNum">
                <span>{props.itemNum}</span>
            </div>
            <Link href={props.href} passHref legacyBehavior>
                <a className="Menu-navItemLink">
                    <div data-label={props.linkLabel} className="Menu-navItemLinkInner colorFill" style={{"--x":"0px","--y":"0px","--r":"0px"}}>
                        {props.linkLabel}
                        <span data-label={props.linkLabel} className="Menu-navItemLinkInnerHover" style={{"color":"rgb(85, 65, 248)"}}>
                        </span>
                    </div>
                </a>
            </Link>
            {
            props.subnav ?
                (<div className="Menu-subnav" >
                    <div className="Menu-subnavItem" ><svg xmlns="http://www.w3.org/2000/svg" className="Menu-subnavArrow icon sprite-icons"><path d="M0 0h2v10H0V0z"/><path d="M10 9v2H0V9h10z"/><path d="M13 10l-4.5 4.33V5.67L13 10z"/></svg></div>
                    <div className="Menu-subnavItem" >
                        <a href="/work/branding" className="Menu-subnavItemLink">Branding</a>
                    </div>
                    <div className="Menu-subnavItem" >
                        <a href="/work/campaigns" className="Menu-subnavItemLink">Campaigns</a>
                    </div>
                    <div className="Menu-subnavItem" >
                        <a href="/work/content" className="Menu-subnavItemLink" aria-current="page">Content</a>
                    </div>
                    <div className="Menu-subnavItem" >
                        <a href="/work/strategy" className="Menu-subnavItemLink">Strategy</a>
                    </div>
                    <div className="Menu-subnavItem" >
                        <a href="/work/workshops" className="Menu-subnavItemLink">Workshops</a>
                    </div>
                </div>)
                :
                ""
            }
        </div>
    );
}

// Main component
function MyApp({ Component, pageProps }) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);

    const router = useRouter();

    const executed = useRef(0);

    const mouse_pos = useRef([0, 0]);
    const menuState = useRef(false);

    const prevCursor = useRef("default-state");

    const [m_content_icon, setm_content_icon] = useState("");

    const [header_route, set_header_route] = useState("");

    const locomotiveScrollInstance = useRef();
    const pageMicroHistory = useRef({prevPage:"", currentPage:""});
    const [pageMicroHistoryState, setPageMicroHistory] = useState({prevPage:"", currentPage:""});
    const windowListeners = useRef({listeners:[], endFunc:[]});

    const headerTriggerStart = useRef("init");
    const s_ref = useRef(0);

    const el_h_event = useRef([]);

    const swiper_instance_left = useRef();
    const swiper_instance_right = useRef();

    const [headerVisibilityState, setHeaderVisibilityState] = useState(0);

    const scroll_trigger_scroller = useRef("[data-scroll-container]")

    function getSwiperInstance(instance_left, instance_right){
        swiper_instance_left.current = instance_left;
        swiper_instance_right.current = instance_right;
    }

	function trackMouse(){
		document.body.addEventListener("mousemove", (e)=>{
			mouse_pos.current[0] = e.clientX;
			mouse_pos.current[1] = e.clientY;
		})
	}

	function getRelativePos(element){
		let element_pos = element.getBoundingClientRect();
		return [mouse_pos.current[0]-element_pos.left, mouse_pos.current[1]-element_pos.top]
	}

    // Functions
    const locomotiveInit = () => {
        if (window.innerWidth >= 1024) {

            import("locomotive-scroll").then((LocomotiveScroll) => {
                locomotiveScrollInstance.current = new LocomotiveScroll.default({
                    el: document.querySelector("[data-scroll-container]"),
                    smooth: true,
                    // lerp: 0.11,
                    disableLerp: true,
                    smartphone: {
                      smooth: true
                    },
                    tablet: {
                      smooth: true
                    },
                    inertia: 0.9,
                });
            });

        } else {
            locomotiveScrollInstance.current = {}
        }

    }

    // for Header
    const scrollTrigger = () => {
        var scroller = document.querySelector(scroll_trigger_scroller.current);
        var scrollMag, prevScrollMag, headerTrigDist; // header animation

        headerTrigDist = document.querySelector(".Header").clientHeight*1.2;

        let iframe, player;

        // to be uncommented
        if ( router.asPath == "/" ){
            iframe = document.querySelector('.homeHeadSection iframe');

            if ( iframe != undefined ){
                player = new Player(iframe);

                player.play()
            }
        }

        const scrollMagSet = (scrollMag, prevScrollMag) => {

            headerTriggerStart.current = "init";

            if ( scrollMag >= headerTrigDist ){ // just after scrolled above trigger -_
                if ( prevScrollMag <= headerTrigDist ){
                    gsap.set(".Header", {y:"0px"});
                    document.querySelector('.Header').classList.add("fixed");
                    gsap.fromTo(".MenuButton", { scale: 0 }, { duration: 0.5, scale: 1, ease:"circ"});
                    headerTriggerStart.current = "init";
                }

            } else if (scrollMag < headerTrigDist && prevScrollMag >= headerTrigDist) { // just after scrolled below trigger -^
                gsap.set(".Header", {y:((-scrollMag).toString()+"px")});
                document.querySelector('.Header').classList.remove("fixed");
                headerTriggerStart.current = "fixed";
            } else if ( scrollMag < headerTrigDist ) { // inbetween scrolling init and fixed =-
                gsap.set(".Header", {y:((-scrollMag).toString()+"px")});
            }

            if ( scrollMag < headerTrigDist && scrollMag > 0 ) { // inbetween scrolling init and fixed =-
                headerTriggerStart.current = "noheader";
            }
        }

        if ( document.body.clientWidth > 1023 ){
            var styleEventListener = new MutationObserver((mutations) => {
                mutations.forEach((MutationRecord) => {

                    // header animation
                    scrollMag = scroller.style.getPropertyValue("transform").split("(")[1].split(")")[0].split(",")[13]*(-1);

                    scrollMagSet(scrollMag, prevScrollMag);
                    prevScrollMag = scrollMag;

                    // popups
                    if ( router.asPath == "/work" ) { gsap.set(".List-popup", {y:scrollMag}); }
                    if ( router.asPath == "/" ) { gsap.set(".Slide-popup", {y:scrollMag}); }
                    // if ( router.asPath == "/work" ) { gsap.set(".List-popup:not(.popup-hidden)", {y:scrollMag}); }
                    // if ( router.asPath == "/" ) { gsap.set(".Slide-popup:not(.popup-hidden)", {y:scrollMag-window.innerHeight}); }

                    // video pausing
                    if ( player != undefined ){

                        if ( scrollMag >= window.innerHeight*0.7 ){
                            player.pause();
                        } else {player.getPaused().then(function(paused) {
                            if ( paused ) player.play();
                          });
                        }

                    }
                })
            })

            styleEventListener.observe(scroller, { attributes : true, attributeFilter : ['style'] });
        }

        if ( document.body.clientWidth <= 1023 ){

            const scroll_listener = ()=>{
                scrollMag = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

                scrollMagSet(scrollMag, prevScrollMag);
                prevScrollMag = scrollMag.toFixed(2);

                // popups
                if ( router.asPath == "/work" ) { gsap.set(".List-popup", {y:scrollMag}); }
                if ( router.asPath == "/" ) { gsap.set(".Slide-popup", {y:scrollMag}); }

                // Text Animation <1023px
                if ( router.asPath == "/" && false ) {
                    let vision_bg_pos = scrollMag;
                    let vision_height = document.querySelector(".Vision").getBoundingClientRect().height
                    let vision_pos = document.querySelector(".Vision").getBoundingClientRect().y + scrollMag - vision_height/2

                    console.log(vision_pos+vision_height-window.innerHeight, vision_bg_pos)

                    if ( scrollMag < vision_pos ){
                        vision_bg_pos = vision_pos
                    }
                    if ( scrollMag > vision_pos+vision_height ){ // -window.innerHeight
                        vision_bg_pos = vision_pos+vision_height
                    }

                    gsap.set(".Vision-bg", {y:vision_bg_pos})

                }

                // video pausing
                if ( player != undefined ){
                    if ( scrollMag >= window.innerHeight*0.7 ){
                        player.pause();
                    } else {player.getPaused().then((paused) => {
                        if ( paused ) player.play();
                      });
                    }
                }

            }
            (window).addEventListener("scroll", scroll_listener);
        }
    }

    // button animation
    const menuButton = () => {
        var menu_btn_el = document.querySelector(".Header .MenuButton");
        var menu_el = document.querySelector(".Header .Menu")
        var menu_nav_el = document.querySelectorAll(".Header .Menu-navItem")

        let iframe, player;

        // to be uncommented
        if ( router.asPath == "/" ){
            iframe = document.querySelector('.homeHeadSection iframe');
            if ( iframe != undefined ){
                player = new Player(iframe);
                player.play()
            }
        }


        let toggleMenuState = () => {
            menuState.current = !menuState.current;
            if ( menuState.current ) {
                if ( player != undefined ) player.pause(); // pausing the home page video

                let delay = 0;
                let duration = 0.7;

                if ( headerTriggerStart.current == "noheader" ){
                    locomotiveScrollInstance.current.scrollTo("top"); // to correct it's position
                    delay = 0.5; // to avoid ui artifacts
                }

                menu_el.style.removeProperty("display");
                gsap.set((document.body || window), { overflowY:"hidden" });

                const gsapTimelineAnimation = gsap.timeline({ defaults:{
                    duration: 0.7,
                    ease: "power3.out"
                 } });

                let menuButtonBoundingRect = menu_btn_el.getBoundingClientRect();

                gsap.set(menu_el, { "--x": ((menuButtonBoundingRect.left + (menuButtonBoundingRect.width)/2).toString() + "px"), "--y": ((menuButtonBoundingRect.top + (menuButtonBoundingRect.height)/2).toString() + "px")})
                gsap.fromTo(menu_el, { "--r":"0px" }, { duration:duration, "--r":(((window.innerWidth >= window.innerHeight ? window.innerWidth : window.innerHeight)*1.3).toString() + "px"), ease:"none", delay:delay });
                gsap.fromTo(".Menu-subnavItem", {x: "200px", opacity: 0}, {x: 0, opacity: 1, ease:"power1" ,duration:0.5, stagger:{
                    from: "end",
                    axis: "x",
                    amount: 0.7
                }});

                menu_nav_el.forEach((element, index) => {
                    let delay;
                    if ( index == 0 ){
                        delay = "<0.2" //"<0.25"
                        if ( headerTriggerStart.current == "noheader" )
                            delay = "<0.75"
                    }
                    else{
                        delay = "<0.01"
                    }

                    gsapTimelineAnimation
                        .fromTo(element.querySelector(".Menu-navItemNum"), { x: element.querySelector(".Menu-navItemNum").clientWidth*14, opacity:0.1 }, { x: 0, opacity:1 }, delay)
                        .fromTo(element.querySelector(".Menu-navItemLinkInner"), { x: element.querySelector(".Menu-navItemLinkInner").clientWidth }, { x: 0, opacity:1 }, "<0.1");
                });

                gsapTimelineAnimation
                    .fromTo(".Header .Menu-logoContainer", { x:document.querySelector(".Header .Menu-logoContainer").clientWidth/3, opacity:0 }, { x: 0, opacity:1 }, "<0.1")
                    .fromTo(".Header .Menu-quickAccessItem", { x:document.querySelector(".Header .Menu-quickAccessItem").clientWidth/3, opacity:0 }, { x: 0, opacity:1 }, "<0.1")
                    .fromTo(".Header .Menu-socials", { x:document.querySelector(".Header .Menu-socials").clientWidth/3, opacity:0 }, { x: 0, opacity:1 }, "<0.1");


                menu_btn_el.classList.toggle("menu-open")
                m_cursor_states("color", {color: "black"})

            } else {
                (document.body || window).style.removeProperty("overflow-y");
                gsap.to(menu_el, { duration:0.5, "--r":"0px", ease:"circ.out", onComplete:()=>{
                    gsap.set(menu_el, {display:"none"});
                    menu_btn_el.classList.toggle("menu-open");
                } });
                m_cursor_states("color", {color: "rgb(85, 65, 248)"});


                if ( player != undefined ) player.play() // continuing the home page video
            }
        }

        menu_btn_el.addEventListener("click", ()=>{
            toggleMenuState()
        })
    }

    const colorFiller = (colorFillsFiltered) => {
        colorFillsFiltered.forEach(element => {

            element.style.setProperty("--x", "0px");
            element.style.setProperty("--y", "0px");
            gsap.set(element, { "--r":"0px" });

            var max_radius = element.clientWidth*1.1;
            var easeValueIn = "none";
            var easeValueOut = "circ";
            var easeValueOutTime = 1;

            if (element.style.getPropertyValue("--ease") != '')
                easeValueIn = element.style.getPropertyValue("--ease");

            if (element.style.getPropertyValue("--ease-end") != '')
                easeValueOut = element.style.getPropertyValue("--ease-end");

            if (element.style.getPropertyValue("--ease-end-duration") != '')
                easeValueOutTime = element.style.getPropertyValue("--ease-end-duration");


            let once_hov = false;
            let mouse_hov = false;
            let anim_state = false;


            element.addEventListener("mousemove", (e)=>{

                if ( !mouse_hov ) return;

                let relativePos = getRelativePos(e.target);
                gsap.to(element, {duration: 1, "--x": (relativePos[0]).toString() + "px", "--y": (relativePos[1]).toString() + "px" });
                // if ( anim_state == true ) gsap.to(e.target, { duration: 0.7, "--r":`${max_radius}px`, ease: easeValueIn});


            })

            element.addEventListener("mouseenter", (e)=>{

                let relativePos = getRelativePos(e.target);
                gsap.to(element, {duration: 0, "--x": (relativePos[0]).toString() + "px", "--y": (relativePos[1]).toString() + "px" });

                if ( !once_hov ) max_radius = element.clientWidth*1.4;
                gsap.fromTo(e.target, { "--r":"0px", ease: easeValueOut}, { duration: 0.7, "--r":`${max_radius}px`, ease: easeValueIn, onComplete: ()=>{ anim_state = true; } })

                once_hov = true;
                mouse_hov = true;
            })

            element.addEventListener("mouseleave", (e)=>{
                // gsap.fromTo(e.target, { "--r":`${max_radius}px`, ease: easeValueIn}, { duration: easeValueOutTime, "--r":"0px", ease: easeValueOut, onComplete: ()=>{ anim_state = false; }})
                gsap.to(e.target, { duration: easeValueOutTime, "--r":"0px", ease: easeValueOut, onComplete: ()=>{ anim_state = false; }});

                mouse_hov = false;
            })

        });
    }

    const m_cursor_states = (state, options) => {

        const c_tl =  gsap.timeline({ defaults:{
            duration: 0.2,
            ease:"power1"
        } })

        if ( state == "link" ){
            c_tl
                .to(".mouseCursor", { scale:1, onComplete: ()=>{
                    setm_content_icon(<svg xmlns="http://www.w3.org/2000/svg" className="mouseCursorIcon icon sprite-icons arrow-diag-icon">
                            <path xmlns="http://www.w3.org/2000/svg" d="M8.307 10.89h9.472L7.203 21.466l2.207 2.206 10.575-10.575v9.472h3.12V7.771H8.307v3.12z"/>
                        </svg>)
                }})
                .fromTo(".mouseCursorIconWrapper", { x: -document.querySelector(".mouseCursor").clientWidth/2, y: document.querySelector(".mouseCursor").clientWidth/2, opacity:0 }, { duration:0.5, x: 0, y: 0, opacity:1, ease:"back" });

            prevCursor.current = "link";
        }
        else if ( state == "link-end"){
            c_tl
                // .set(m_cursor_scale, { current:1 });
                .to(".mouseCursor", { scale:0.2, onComplete: ()=>{
                    setm_content_icon("")
                }});
            prevCursor.current = "default-state";
        }
        else if ( state == "slide-arrow-left" ){
            c_tl
                .to(".mouseCursor", { scale:1, onComplete: ()=>{
                    setm_content_icon(<svg xmlns="http://www.w3.org/2000/svg" className="mouseCursorIcon icon sprite-icons move-arrow">
                            <path xmlns="http://www.w3.org/2000/svg" d="M12.7 18.7L6 12h15V8.9H6l6.7-6.7L10.5 0 0 10.5l10.5 10.4 2.2-2.2z"/>
                        </svg>)
                }})
                .fromTo(".mouseCursorIconWrapper", { x: document.querySelector(".mouseCursor").clientWidth/2, y: 0, opacity:0 }, { duration:0.5, x: 0, y: 0, opacity:1, ease:"back" });

            prevCursor.current = "link";
        }
        else if ( state == "slide-arrow-right" ){
            c_tl
                .to(".mouseCursor", { scale:1, onComplete: ()=>{
                    setm_content_icon(<svg xmlns="http://www.w3.org/2000/svg" className="mouseCursorIcon icon sprite-icons move-arrow">
                            <path xmlns="http://www.w3.org/2000/svg" d="M8.3 2.2L15 8.9H0V12h15l-6.7 6.7 2.2 2.2L21 10.4 10.5 0 8.3 2.2z"/>
                        </svg>)
                }})
                .fromTo(".mouseCursorIconWrapper", { x: -document.querySelector(".mouseCursor").clientWidth/2, y: 0, opacity:0 }, { duration:0.5, x: 0, y: 0, opacity:1, ease:"back" });

            prevCursor.current = "link";
        }
        else if ( state == "move-slide" ){
            c_tl
                .to(".mouseCursor", { scale:1, onComplete: ()=>{
                    setm_content_icon(
                        <div className="mouseCursorIcon drag-drop-icon">
                            <svg className="drag-drop-arrow icon sprite-icons" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(180deg) scale(1, -1)"}}>
                                <use href="/assets/required_vectors.svg#i-arrow-right" ></use>
                            </svg>
                            <svg className="drag-drop-arrow icon sprite-icons" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/required_vectors.svg#i-arrow-right" ></use>
                            </svg>
                        </div>
                    );

                    let i = setInterval(() => {


                        if ( document.querySelectorAll(".drag-drop-arrow") === undefined ) return;

                        try {
                            c_tl
                            .fromTo(document.querySelectorAll(".drag-drop-arrow")[0],
                                { x: document.querySelector(".drag-drop-arrow").clientWidth, opacity:0 },
                                { duration:0.5, x: 0, opacity:1, ease:"back" }
                            )
                            .fromTo(document.querySelectorAll(".drag-drop-arrow")[1],
                                { x: -document.querySelector(".drag-drop-arrow").clientWidth, opacity:0 },
                                { duration:0.5, x: 0, opacity:1, ease:"back" }, "<0"
                            );
                        } catch (error) {
                        }


                        clearInterval(i);

                    }, 0);

            }});

            prevCursor.current = "move-slide";
        }
        else if ( state == "move-slide-click"){
            try {
                c_tl
                    .fromTo(document.querySelectorAll(".drag-drop-arrow")[0],
                        { x: 0 },
                        { duration:0.5,  x: document.querySelector(".drag-drop-arrow").clientWidth/2, ease:"back" }
                    )
                    .fromTo(document.querySelectorAll(".drag-drop-arrow")[1],
                        { x: 0 },
                        { duration:0.5,  x: -document.querySelector(".drag-drop-arrow").clientWidth/2, ease:"back" },
                        "<0"
                    )
                    .to(".mouseCursor", { scale:0.8 }, "<0");
            } catch (error) { }
        }
        else if ( state == "move-slide-click-end"){
            try {
                c_tl
                    .fromTo(document.querySelectorAll(".drag-drop-arrow")[0],
                        { x: document.querySelector(".drag-drop-arrow").clientWidth/2 },
                        { duration:0.5,  x: 0, ease:"back" }
                    )
                    .fromTo(document.querySelectorAll(".drag-drop-arrow")[1],
                        { x: -document.querySelector(".drag-drop-arrow").clientWidth/2 },
                        { duration:0.5,  x: 0, ease:"back" },
                        "<0"
                    )
                    .to(".mouseCursor", { scale:1 }, "<0");
            } catch (error) { }
        }
        else if ( state == "move-slide-end" ){
            c_tl
                .to(".mouseCursor", { scale:0.2, onComplete: ()=>{
                    setm_content_icon("")
                }});
            prevCursor.current = "default-state";
        }

        else if ( state == "color" ){
            options.color = ( options.color == "default" ) ? "rgb(85, 65, 248)" : options.color;
            c_tl
                .to(".mouseCursor", { duration:0.5, backgroundColor:(options.color), borderColor:(options.color), ease:"sine" });
        }

        else if ( state == "default-state" ){
            c_tl
                .to(".mouseCursor", { scale:0.2, onComplete: ()=>{
                    setm_content_icon("")
                }});
            prevCursor.current = "default-state";
        }

    }

    const m_cursor_eventListeners = () => {

        m_cursor_states("link-end");

        if ( pageMicroHistory.current.currentPage == "/contact" ) m_cursor_states("color", {color: "black"});
        else m_cursor_states("color", {color: "default"});

        // classes having link
        var cl_h_link = {
            "/" : [".Works-slideContent", ".ideasBehind-item", ".AppButton", ".Menu-navItemLink"],
            "/work" : [".WorksListItem", ".AppButton", ".Menu-navItemLink", ".Menu-subnavItemLink"],
            "/directors" : [".AppButton", ".Menu-navItemLink", ".Menu-subnavItemLink"],
            "/team" : [".AppButton", ".Menu-navItemLink", ".Menu-subnavItemLink"],
            "/contact" : [".AppButton", ".ContactDetailsInfo.Contact-Map"],
            "/about" : [".AppButton", ".Menu-navItemLink", ".Menu-subnavItemLink"],
        }

        if ( cl_h_link[router.asPath] !== undefined ){

            cl_h_link[router.asPath].forEach(cl => {

                const cl_querySelections = document.querySelectorAll(cl);

                if ( cl_querySelections == undefined ) return; // checking if existential or not

                // iterating all the elements contained in query selection
                cl_querySelections.forEach((h_link, index) => {
                    // h_link => link dom element
                    if ( el_h_event.current.indexOf(h_link) === -1 /* avoids dublicates of events */ ){
                        let conserveCursorState = ""; // in order to conserve before and after states


                        // here the h_link considered with Menu elements don't work as supposed no even listeners sets


                        h_link.addEventListener("mouseenter", (e)=>{

                            // Conditional cases for special classes
                            if ( cl === ".ideasBehind-item" ){
                                // changing mouse cursor color when hovered over larged fancy text
                                m_cursor_states("color", { color: h_link.style.getPropertyValue("--ideasBehindColor")});
                            }
                            if ( cl === ".Menu-navItemLink" ){
                                // changes menu background color
                                let menuColorPresets = ["rgb(85, 65, 248)", "rgb(175, 55, 217)", "rgb(222, 71, 126)", "rgb(242, 173, 69)"];

                                gsap.to(".Menu", {background:menuColorPresets[index]});
                                gsap.to(".Menu-navItemLinkInnerHover", {color:menuColorPresets[index]});

                                gsap.to("#__next > header > div.Menu > div.Menu-wrapper > div > div.Menu-socials > div:nth-child(2) > a > svg > g > path:nth-child(2)", {fill:menuColorPresets[index]});
                                gsap.to("#__next > header > div.Menu > div.Menu-wrapper > div > div.Menu-socials > div:nth-child(1) > a > svg > g > path:nth-child(2)", {fill:menuColorPresets[index]});
                                gsap.to("#__next > header > div.Menu > div.Menu-wrapper > div > div.Menu-socials > div:nth-child(1) > a > svg > g > path:nth-child(3)", {fill:menuColorPresets[index]});
                                gsap.to("#__next > header > div.Menu > div.Menu-wrapper > div > div.Menu-socials > div:nth-child(1) > a > svg > g > path:nth-child(4)", {fill:menuColorPresets[index]});

                            }

                            conserveCursorState = prevCursor.current;
                            m_cursor_states("link");
                        });
                        h_link.addEventListener("mouseleave", (e)=>{

                            if ( cl === ".ideasBehind-item" ){
                                m_cursor_states("color", { color: "default" });
                            }

                            m_cursor_states(conserveCursorState);
                        });

                        el_h_event.current.push(h_link);
                    }
                });

            });

        }

        // cl having slide
        var cl_h_arrow = {
            "/" : [".trustersLoop"],
            "/work" : [],
            "/directors" : [],
            "/team" : [],
            "/contact" : [],
            "/about" : [],
        }

        if ( cl_h_arrow[router.asPath] !== undefined ){

            cl_h_arrow[router.asPath].forEach((cl, index) => {

                document.querySelectorAll(cl).forEach(h_arrow => {
                    if ( el_h_event.current.indexOf(h_arrow) === -1 ){
                        let conserveCursorState = ""

                        let d_arrow = "";
                        let prev_d_arrow = "";
                        let centre = window.innerWidth/2;

                        let listener_ref;

                        // let slide_interv = setInterval(() => {
                        h_arrow.addEventListener("mouseenter", (e)=>{
                            conserveCursorState = prevCursor.current;
                        })

                        h_arrow.addEventListener("mousemove", (e)=>{
                            // listener_ref = document.addEventListener("mousemove", (e) => {
                            // if ( swiper_instance_right.current == undefined ) return;
                            if ( router.asPath != "/" ) { h_arrow.removeEventListener("mousemove", listener_ref) }

                            if ( e.pageX < centre ){
                                prev_d_arrow = d_arrow;
                                d_arrow = "slide-arrow-left"
                            } else {
                                prev_d_arrow = d_arrow;
                                d_arrow ="slide-arrow-right"
                            }

                            if ( prev_d_arrow != d_arrow ){
                                m_cursor_states(d_arrow);
                            }

                        }, 0);

                        h_arrow.addEventListener("click", (e)=>{

                            if ( d_arrow == "slide-arrow-right" ){
                                document.querySelector("#trust_Right").click();
                            } else {
                                document.querySelector("#trust_Left").click();
                            }
                        })

                        h_arrow.addEventListener("mouseleave", (e)=>{

                            h_arrow.removeEventListener("mousemove", listener_ref)
                            m_cursor_states(conserveCursorState );
                            d_arrow = "";
                            prev_d_arrow = "";

                        });



                        el_h_event.current.push(h_arrow);

                    }
                });
            });

        }

        // cl having slide
        var cl_h_slide = {
            "/" : [".Works-slider"],
            "/work" : [],
            "/directors" : [],
            "/team" : [],
            "/contact" : [],
            "/about" : [],
        }

        if ( cl_h_slide[router.asPath] !== undefined ){

            cl_h_slide[router.asPath].forEach(cl => {
                document.querySelectorAll(cl).forEach(h_link => {
                    if ( el_h_event.current.indexOf(h_link) === -1 ){
                        let conserveCursorState = ""

                        h_link.addEventListener("mouseenter", (e)=>{
                            conserveCursorState = prevCursor.current
                            m_cursor_states("move-slide");
                        });
                        h_link.addEventListener("mouseleave", (e)=>{
                            m_cursor_states(conserveCursorState );
                        });

                        el_h_event.current.push(h_link);

                    }
                });
            });

        }

    }

    const p_scroll_trigger = (type)=>{

        // classes
        var split_t_anim_cl = {
        //  "<route>": {main_target:"<root_class_cont or just el>", head_obj:"<main_heading>", opacity_obj:"<>", lower_part:"<>", button:"<button_root_class>"}
            "/" : {main_target: [".ideasTitle", ".footerLearnMore", ".ideasBehind-wrapper", ".Works-slider", ".ideasImageCarousel", ".footerTrustedBy", ".Vision-title",        ".Vision-title",        ".Vision-title"],
                    head_obj:   [".ideasTitle > h1", ".footerLearnMore > h4, .footerLearnMore > h1", "", "", "", "",                                    ".HomeTitle-surtitle",  ".HomeTitle-title--l1", ".HomeTitle-title--l2" ],
                    opacity_obj:["", " > p", ".ideasBehind-item", "", ".swiper", "h2, .swiper-slide-active .trusterSliderItem, .swiper-pagination-bullets", "", "", ""], //.trusterSlider:nth-child(-n+3) .trusterSliderItem
                    // slide_obj:["", "", "", ".Works-wrapper", "", ""],
                    opacity_dur:["undef", "undef", "0.5", "0.5", "0.5", "0.5", "", "", ""],
                    button_obj: ["", ".AppButton", "", "", "", "", "", "", ""],
                    anim_trig:  ["", ".footerLearnMore > h4", ".ideasBehind-item:nth-child(1)", ".Works-wrapper", ".swiper", "h2",                       ".HomeTitle-surtitle", ".HomeTitle-title--l1", ".HomeTitle-title--l2"]},

            "/work" : {main_target:[".readyToMake"],
                        head_obj:[".readyToMake-text"],
                        button_obj:[".AppButton"]},

            "/directors" : {main_target:[], head_obj:[]},

            "/team" : {main_target:[], head_obj:[]},

            "/contact" : {main_target:[], head_obj:[]},

            "/about" : {main_target:[".readyToMake", ".Label", ".footerTrustedBy"],
                        head_obj:[".readyToMake-text", ".Label-header > h2", ""],
                        opacity_obj:["", ".Label-tags, .Label-title > h4", "h2, .trustersLoop" ],
                        opacity_dur:["undef", "undef", "0.5"],
                        button_obj:[".AppButton", "", ""],
                        anim_trig:["", ".Label-header", "h2"]
                    },
        }

        // on view animation of split-texts, opacity and translation
        import("splitting").then((Splitting) => {

            // animtating
            if ( Splitting === undefined ) return;
            if ( split_t_anim_cl[router.asPath] !== undefined ){
                let c_p_l = split_t_anim_cl[window.location.pathname]
                c_p_l.main_target.forEach( (target_bunch, index) => {

                    let target_bunch_copy = target_bunch
                    // let tar  = target_bunch

                    document.querySelectorAll(target_bunch).forEach(
                        (cur_target, m_ind)=>{

                            if ( document.querySelectorAll(c_p_l.main_target[index]).length > 1 ){
                                target_bunch = `${target_bunch_copy}:nth-child(${m_ind+1})`
                            }

                            let start_el = c_p_l.main_target[index]

                            // Defines what a object will be initial in default
                            let default_from = {
                                opacity: 0
                            }

                            let default_tl_to = {
                                stagger:0.05
                            }
                            let tween_to = {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotate: 0
                            }

                            if ( c_p_l.anim_trig !== undefined && c_p_l.anim_trig !== "" ){
                                if ( c_p_l.anim_trig[index] !== "" )
                                    if ( start_el.indexOf(target_bunch) === -1 )
                                        start_el = target_bunch + " " + c_p_l.anim_trig[index]
                            }


                            let limit = 70 // (>= 1024)
                            if (document.body.clientWidth <= 1023) { limit = 50 }

                            const sc_anim_tl = gsap.timeline({
                                defaults:{
                                    ease: "sine"
                                },
                                scrollTrigger:{
                                    trigger: start_el,
                                    scroller: scroll_trigger_scroller.current,
                                    start: "top top+=start%".replace("start", limit),
                                    end: "top top",
                                }
                            });

                            if ( c_p_l.main_target !== undefined ){

                                //  For text having splitting thing
                                let anim_f = ( { el, tween_p, delay, break_down=["chars", "char"], fn_c } )=>{

                                    if ( el === "root_el" ) el = c_p_l.main_target[index];
                                    else el = el;

                                    if ( el.indexOf(target_bunch) === -1 )
                                        el = target_bunch + " " + el.replace(",", `, ${target_bunch}`);

                                    if ( el === undefined ) return;

                                    // console.log(document.querySelector(el), el)

                                    // Incase of Heading element if style not provided
                                    if ( (["h1", "h2", "h3", "h4", "span"].indexOf( document.querySelector(el).tagName.toLowerCase()) !== -1) ){


                                        tween_p = (tween_p !== undefined) ? tween_p : {
                                            x: cur_target.clientWidth*0.08
                                        }

                                    }

                                    if ( c_p_l.main_target[index] == ".readyToMake" ){
                                        default_tl_to = {...default_tl_to, ...{
                                            duration: document.querySelector(el).clientWidth*0.001,
                                            stagger: document.querySelector(el).clientWidth*0.0001*0.25
                                        }}
                                    }

                                    // Spliting the text for our requirement.
                                    Splitting.default({ target:el, by:break_down[0] });

                                    let cur_tar_bunch = target_bunch

                                    // Waiting until split text is done.
                                    let tl_interv = setInterval(() => {

                                        let cur_el = document.querySelectorAll((break_down[0] == "") ? el:(el.replace(",", " ."+break_down[1]+",")+" ."+break_down[1]));

                                        if ( cur_el  === undefined ) return;

                                        gsap
                                            .set( cur_el , {...tween_p, ...default_from} );

                                        sc_anim_tl
                                            .to( cur_el, {...tween_to, ...default_tl_to}, delay );

                                        fn_c(cur_tar_bunch)

                                        clearInterval(tl_interv)
                                    }, 0);

                                }

                                // opacity and button obj func
                                let opac_bu_objFunc = (target_bunch) => {

                                    // opacity_obj
                                    if ( c_p_l.opacity_obj !== undefined && c_p_l.opacity_obj[index] !== "" ){

                                        let el = c_p_l.opacity_obj[index]

                                        if ( el.indexOf(target_bunch) === -1 )
                                            el = target_bunch + " " + el.replace(",", `, ${target_bunch}`);

                                        gsap.set( el,
                                            { opacity: 0 }
                                        )

                                        sc_anim_tl
                                            .to( el,
                                                { stagger: 0.05, opacity: 1,
                                                    duration:( c_p_l.opacity_dur[index] !== "undef" ) ? c_p_l.opacity_dur[index] : "1",
                                                    // ease:( c_p_l.opacity_dur[index] !== "undef" ) ? "none" : "power3"
                                                },
                                                ( c_p_l.opacity_dur[index] !== "undef" ) ? undefined : "<0.5"
                                            )
                                        if ( el.indexOf(".trusterSliderItem") != -1 )
                                            sc_anim_tl
                                                .fromTo(".swiper-slide-active .trusterSliderItem", { scale: 0 }, { stagger: 0.05, scale: 1 }, "<0" )
                                    }

                                    // button_obj
                                    if ( c_p_l.button_obj !== undefined && c_p_l.button_obj[index] !== undefined && c_p_l.button_obj[index] !== "" ){

                                        let el = c_p_l.button_obj[index]

                                        if ( el.indexOf(target_bunch) === -1 )
                                            el = target_bunch + " " + el.replace(",", `, ${target_bunch}`);

                                        gsap.set( el + " " + ".AppButton-bg",
                                            { scaleX: 0, opacity: 0 }
                                        )
                                        gsap.set( el + " " + ".AppButton-label",
                                            { scale: 1.2, opacity: 0 }
                                        )

                                        sc_anim_tl
                                            .to( el + " " + ".AppButton-bg",
                                                { scaleX: 1, opacity: 1, duration:0.5, ease:"power3" },
                                                "<0.25"
                                            )
                                            .to( el + " " + ".AppButton-label",
                                                { scale: 1, opacity: 1, duration:0.7, ease:"power3" },
                                                "<0"
                                            )
                                    }
                                }

                                // Top Text
                                if ( c_p_l.head_obj !== undefined && c_p_l.head_obj[index] != "" && c_p_l.head_obj[index] != undefined ){
                                    anim_f( {
                                        el: c_p_l.head_obj[index],
                                        fn_c: opac_bu_objFunc,
                                        delay: "<0"
                                    })
                                } else {

                                    opac_bu_objFunc(target_bunch);

                                }
                            }

                        }
                    )

                });
            }
        });

        // footer planet animation
        gsap.fromTo( ".Footer-planetbg", {y:"15%"}, {
            y: "0%",
            duration: 1.4,
            ease: "power1",
            scrollTrigger:{
                trigger: ".Footer-wrapper",
                scroller: scroll_trigger_scroller.current,
                start: "top bottom",
                end: "top 30%",
            }
        });

        // only home page animations
        if ( window.location.pathname === "/" ){

            {// works slider section
                if ( s_ref.current === undefined ) return;

                const w_s_tl =  gsap.timeline({
                    defaults : {
                        duration: 1,
                        // ease: "sine",
                    },
                    scrollTrigger:{
                        trigger: ".Works-slider",
                        scroller: scroll_trigger_scroller.current,
                        start: "top 67%",
                        end: "top 0%"
                    }
                });

                // Changing the slider magnatude of slide
                gsap.set(s_ref.current, {
                    currentX: (s_ref.current.slideWidth) * 1.3
                })

                w_s_tl
                    .fromTo(".Works-slider", { opacity: 0 }, { opacity: 1, duration: 1 })
                    // .from(".Works-slideInner", { x: `${( 80 * 0.69 )}vw` }, "<0")
                    .to(s_ref.current, {
                        currentX: 0,
                        duration: 1.5,
                        ease: "circ",
                        onComplete: ()=>{
                            s_ref.current.snappingState = 1
                        }
                    }, "<0");
            }

            if ( window.innerWidth >= 1024  ){
                {// animation of vision sections

                    // reference to be used in scroll trigger attributes
                    // let page_scroller = document.querySelector(scroll_trigger_scroller.current);

                    let el_vision = document.querySelector(".Vision")
                    let percen_vision = ((el_vision.clientHeight + parseInt((window.getComputedStyle(el_vision).marginTop).replace("px")) + 0.07*parseInt((window.getComputedStyle(el_vision).marginBottom).replace("px")))/window.innerHeight)*100 - 55;

                    // what changes are made,
                        // 15% from all other slides other than first one.
                        // so, 15*3vw ~ 26.66% of vh to be increased

                    //  As can be intuitively thought second limit can be set as per the dimensions of .vision element,
                    //      Particularly (0.98 of the height + top margin) / (height of screen)


                    {// Ending animation

                        let end_tl = gsap.timeline({
                            defaults:{ duration:0.7, ease:"sine" },
                            scrollTrigger:{
                                trigger: ".Vision",
                                scroller: scroll_trigger_scroller.current,
                                start: "bottom top+=20%",
                                end: "bottom top",
                                scrub: true,
                            }
                        })

                        end_tl
                            .to(".Vision-bgCircle", { opacity: 0 })
                            .to(".Vision .BackgroundCross-inner", { opacity: 0 }, "<0");


                    }

                    {// image poping animation

                        // checks if last time an element was played or not, to avoid infinite plays
                        let prev_pl_state = [false, false, false, false]

                        let scroll_vec = +1;
                        let prev_prog = 0;
                        let scroll_prog = 0;

                        let Vision_bgItem = document.querySelectorAll(".Vision-bgItem")

                        // image animating function
                        const anim_img = (img_index_N, range_N)=> {

                            if ( window.location.pathname !== "/" ) return;

                            let this_index = img_index_N // index in natural number
                            let index_by_array = this_index-1

                            let prev_class = undefined, next_class = undefined;

                            if ( this_index != range_N[0] ) { prev_class = ".Vision-item:nth-child("+(this_index-1)+")"} // avoid first image
                            let this_class = ".Vision-item:nth-child("+this_index+")"
                            if ( this_index != range_N[range_N.length-1] ) { next_class = ".Vision-item:nth-child("+(this_index+1)+")"} // avoid last image

                            try { // as to counter any senseless error

                                // let an_prog_val = document.querySelector(this_class.replace("-item", "-bgItem")).style.getPropertyValue("--val") // being set while animation playes through
                                let an_prog_val = (scroll_prog*range_N[1] - index_by_array)*100
                                if ( an_prog_val < 0  ){ an_prog_val = 0;}
                                else if ( an_prog_val > 100 ){ an_prog_val = 100; }

                                if ( an_prog_val <= 5 || (an_prog_val >= 100 && this_index == range_N[range_N.length-1]) ){ // in the initial range the image this make it remain invisible or // when animation is fully completed the

                                    // putting current img to zero state
                                    gsap.to(this_class.replace("-item", "-bgItem"), {scale: 0.6, opacity:0});
                                    document.querySelector(this_class).classList.remove("active");

                                    prev_pl_state[index_by_array] = false;

                                } else { // playes for once when entering the range

                                    if ( prev_pl_state[index_by_array] ) return; // doesn't playes if already played and has not yet changed image.

                                    gsap.to(
                                        `${ ( prev_class != undefined ) ? prev_class.replace("-item", "-bgItem") : "" } ${ ( prev_class != undefined && next_class != undefined) ? ", " : "" } ${ ( next_class != undefined ) ? next_class.replace("-item", "-bgItem") : "" }`,
                                        { // setting the previous element to invisible state, then
                                            scale: 0.6,
                                            opacity:0,
                                            duration: ( (this_index == range_N[0] && !prev_pl_state[index_by_array+1] && scroll_vec == +1) || (this_index == range_N[range_N.length-1] && !prev_pl_state[index_by_array-1] && scroll_vec == -1) ) ? 0 : 0.5, // as to avoid too much delay while the first scroll happens into the animation
                                            onComplete: ()=> { // setting up the current image as the visible

                                                if ( (scroll_prog*range_N[1] - index_by_array) > 1 ) return;

                                                for (let i = 0; i < range_N[1]; i++) {
                                                    if ( i != index_by_array ){
                                                        gsap.to(Vision_bgItem[i], {scale: 0.6, opacity:0, duration:0.5} );
                                                    }
                                                }

                                                // to be made fluent
                                                gsap.fromTo(this_class.replace("-item", "-bgItem"), {scale: 1.2, opacity:0}, {scale: 1, opacity:1 }); // scale in
                                                gsap.fromTo(this_class.replace("-item", "-bgItem")+" .Vision-bgItemWrapImage", {scale: 1}, {scale: 1.2}); // scale out

                                                // swaping the ending dash
                                                if ( prev_class != undefined ) { document.querySelector(prev_class).classList.remove("active"); }
                                                document.querySelector(this_class).classList.add("active");
                                                if ( next_class != undefined ) { document.querySelector(next_class).classList.remove("active"); }

                                            }
                                    });

                                    if ( prev_class != undefined ) { prev_pl_state[index_by_array-1] = false; }
                                    prev_pl_state[index_by_array] = true;
                                    if ( next_class != undefined ) { prev_pl_state[index_by_array+1] = false; }


                                }

                            } catch (error) {}

                        }

                        // let limits = [55, 85 + 26.66*3] // (>= 1024)
                        let limits = [55, percen_vision] // (>= 1024)

                        // if (document.body.clientWidth <= 1023) { limits = [55, 65] }

                        let visionItem_tl = gsap.timeline({
                            defaults:{
                                duration: 0.2
                            },
                            scrollTrigger:{
                                trigger: ".Vision-item:first-child",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top+=up%".replace("up", limits[0]), // It is (limits[0] + limits[1])% of scrubbing area with
                                end: "top top-=low%".replace("low", limits[1]), // 0, 0.25, 0.5, 0.75 triggering spots of four animations in (limits[0] + limits[1])% of screen
                                scrub: 2.5, // to give a lag of 1 second.
                                onUpdate : self => {
                                    scroll_vec = (self.progress.toFixed(3) - prev_prog) // measuring the change
                                    scroll_vec = scroll_vec/Math.sign(scroll_vec)*scroll_vec  // getting the direction
                                    prev_prog = scroll_vec + prev_prog // remembering what was the progress

                                    scroll_prog = self.progress.toFixed(3);
                                }
                            }
                        });

                        // line bt line animation of each Image
                        visionItem_tl
                            .fromTo(".Vision-bgItem:first-child", {
                            }, {
                                onUpdate: ()=> {
                                    anim_img(1, [1, 5])
                                }
                            }, 0)
                            .fromTo(".Vision-bgItem:nth-child(2)", {}, {
                                onUpdate: ()=> {
                                    anim_img(2, [1, 5])
                                }
                            }, 0.2)
                            .fromTo(".Vision-bgItem:nth-child(3)", {}, {
                                onUpdate: ()=> {
                                    anim_img(3, [1, 5])
                                }
                            }, 0.4)
                            .fromTo(".Vision-bgItem:nth-child(4)", {}, {
                                onUpdate: ()=> {
                                    anim_img(4, [1, 5])
                                }
                            }, 0.6)
                            .fromTo(".Vision-bgItem:nth-child(5)", {}, {
                                onUpdate: ()=> {
                                    anim_img(5, [1, 5])
                                }
                            }, 0.8)

                        // nullifyinh errors caused by code above
                        let last_index = 4;
                        gsap.to(".Vision-bgItem:nth-child(index)".replace("index", last_index),
                            { // setting last element as not visible, as being made visible by above code
                                scale: 0.6,
                                opacity:0,
                                onComplete:()=>{
                                        gsap.to(".Vision-bgItem:nth-child(index)".replace("index", last_index), {scale: 0.6, opacity:0});

                                        document.querySelector(".Vision-item:first-child").classList.remove("active");
                                        document.querySelector(".Vision-item:nth-child(index)".replace("index", last_index)).classList.remove("active");
                                    }
                            }
                        );

                    }

                    {// (not in use) changes in the animation elements( circle ) on the mentioned position
                        // let sec_tl = gsap.timeline({
                        // defaults:{
                        //     ease: "sine"
                        // },
                        // scrollTrigger:{
                        //     trigger: ".Vision",
                        //     scroller: scroll_trigger_scroller.current,
                        //     start: "top top",
                        //     end: "top top-=30%",
                        //     // end: "top top-=30%",
                        //     scrub: true
                        // }
                        // });

                        // deprecated currently
                        // sec_tl
                        //     .fromTo(".Vision-bgAnimatedLogoVideo", {scale:"1"}, {scale:"0"})
                        //     .fromTo(".Vision-bgCircle", {scale:"1"}, {scale:"0.8"}, "<0");
                    }

                    {// initial motion into the animation
                        let init_tl = gsap.timeline({
                            defaults:{

                            },
                            scrollTrigger:{
                                trigger: ".Vision-bg",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top+=20%",
                                end: "top top",
                                scrub: true,
                                // markers: true
                            }
                        })

                        if ( window.innerWidth >= 1024){

                            init_tl
                                .fromTo(".Vision-bgAnimatedLogoVideo", {scale:"0.0146"}, {scale:"1"} ) // not visible currently( display: none )
                                .fromTo(".Vision-bg", { opacity: 0.9 }, { opacity: 0.9 }, "<0")
                                .fromTo(".Vision-bgCircle", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 0.1 }, "<0")
                                .fromTo(".Vision .BackgroundCross-inner", { scale: 1, opacity: 0 }, { scale: 0.95, opacity: 0.3 }, "<0");

                            // forcing the values, as they get distrupted by above one
                            gsap.set(".Vision-bgCircle", { scale: 2, opacity: 0 });

                        }

                    }

                    {// while scrolling through the section

                    // changes, as the things change
                    let limits = [55, percen_vision-30] // (>= 1024)

                    if ( (document.body.clientWidth >= 1024) ) gsap.set(".Vision-bg", {transform:"translate3d(0px, calc(-57.6vh * 0.69), 0px)"});
                    gsap.fromTo(".Vision-bg",
                        { opacity: 0.9, },
                        {
                            opacity: 1,
                            scrollTrigger:{
                                trigger: ".Vision-bg",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top",
                                end: "top top-=h%".replace("h", limits[0] + limits[1]),
                                scrub: true,
                                pin: (document.body.clientWidth >= 1024),
                            }
                        }
                    );

                    gsap.set(".Vision .BackgroundCross-inner", {transform:"translate3d(0px, calc(-14vw*0.69), 0px)"});
                    gsap.fromTo(".Vision .BackgroundCross-inner",
                        {
                            opacity: 0.3,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            scale: 0.8744,
                            scrollTrigger:{
                                trigger: ".Vision .BackgroundCross-inner",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top",
                                end: "bottom top",
                                scrub: true,
                                pin: (document.body.clientWidth >= 1024)
                            }
                        }
                    );

                    gsap.fromTo(".Vision-bgCircle",
                        {
                            opacity: 0.1,
                            scale: 1
                        },
                        {
                            opacity: 0.3,
                            scale: 1.1,
                            scrollTrigger:{
                                trigger: ".Vision .BackgroundCross-inner",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top",
                                end: "bottom top",
                                scrub: true,
                                pin: (document.body.clientWidth >= 1024)
                            }
                        }
                    );
                    gsap.set(".Vision-bgCircle", {opacity: 0, scale: 0});
                    }

                    {// texts poping animation on initial look
                        [...document.querySelectorAll(".Vision-item")].forEach((el, index) => {

                            // On Scroll Texts Animation
                            let visionItem1Text_a = gsap.timeline({
                                defaults: { duration:0.7, ease:"sine" },
                                scrollTrigger: {
                                    trigger: el,
                                    scroller: scroll_trigger_scroller.current,
                                    start: "top top+=50%",
                                    end: "top top+=40%",
                                }
                            });

                            let index_condition = (((index+2)%2)?-1:1)

                            gsap.set(el.querySelector(".Vision-itemTitle"), {x:`${index_condition*20*0.69}vw`, y:`${15*0.69}vw`, opacity:0})
                            gsap.set(el.querySelector(".Vision-itemSubtitle"), {x:`${index_condition*10*0.69}vw`, y:`${0*0.69}vw`})
                            gsap.set(el.querySelector(".Vision-itemKeyFigures"), {x:`${index_condition*10*0.69}vw`, y:`${0*0.69}vw`})

                            visionItem1Text_a
                                .fromTo(el.querySelector(".Vision-itemTitle"),      {x:`${index_condition*20*0.69}vw`, y:`${15*0.69}vw`, opacity:0}, {transform:"translate3d(0px, 0px, 0px)", opacity:1}, 0)
                                .fromTo(el.querySelector(".Vision-itemSubtitle"),   {x:`${index_condition*10*0.69}vw`, y:`${0*0.69}vw`, opacity:0},  {transform:"translate3d(0px, 0px, 0px)", opacity:1}, "<0.3")
                                .fromTo(el.querySelector(".Vision-itemKeyFigures"), {x:`${index_condition*10*0.69}vw`, y:`${0*0.69}vw`, opacity:0},  {transform:"translate3d(0px, 0px, 0px)", opacity:1}, "<0.3")

                        });
                    }
                }

                {// animation of ideasBehind

                    // reference to be used in scroll trigger attributes
                    // let page_scroller = document.querySelector(scroll_trigger_scroller.current);

                    {// initial motion into the animation
                        let init_tl = gsap.timeline({
                            defaults:{

                            },
                            scrollTrigger:{
                                trigger: ".ideasBehind-wrapper",
                                scroller: scroll_trigger_scroller.current,
                                start: "top top+=50%",
                                end: "top top+=20%",
                                scrub: true,
                                // markers: true
                            }
                        })

                        init_tl
                            .fromTo(".ideasBehind-wrapper .BackgroundCross-inner", { scale: 1, opacity: 0 }, { scale: 0.95, opacity: 0.5 });

                    }

                    {// while scrolling through the section

                        gsap.set(".ideasBehind-wrapper .BackgroundCross-inner", {transform:"translate3d(0px, calc(-14vw*0.69), 0px)"});
                        gsap.fromTo(".ideasBehind-wrapper .BackgroundCross-inner",
                            {
                                opacity: 0.5,
                                scale: 0.95
                            },
                            {
                                opacity: 1,
                                scale: 0.8744,
                                scrollTrigger:{
                                    trigger: ".ideasBehind-wrapper .BackgroundCross-inner",
                                    scroller: scroll_trigger_scroller.current,
                                    start: "top top",
                                    end: "top+=67% top",
                                    scrub: true,
                                    pin: (document.body.clientWidth >= 1024)
                                }
                            }
                        );

                    }
                }
            }


        }
    }

    const initialize_triggers = ( callBack ) =>{
        let inter_ref = setInterval(() => {

            if ( locomotiveScrollInstance.current === undefined && window.innerWidth >= 1024 ) return;

            // if ( true ){
            if ( window.innerWidth >= 1024 ){

                // Setting up Scroll Trigger with locomotive
                locomotiveScrollInstance.current.on("scroll", ScrollTrigger.update);
                ScrollTrigger.scrollerProxy("[data-scroll-container]", {
                    scrollTop(value) {
                        return arguments.length ? locomotiveScrollInstance.current.scrollTo(value, 0, 0) : locomotiveScrollInstance.current.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                    },

                    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
                });

            } else {

                scroll_trigger_scroller.current = undefined;

            }

            if ( callBack !== undefined ) callBack();
            p_scroll_trigger();

            if ( locomotiveScrollInstance.current !== undefined || !(window.innerWidth >= 1024) ) clearInterval(inter_ref);

        }, 0);
    }

    const lazy_load = () => {


        { // video lazy loading
            var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

            if ("IntersectionObserver" in window) {
              var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(video) {
                  if (video.isIntersecting) {
                    for (var source in video.target.children) {
                      var videoSource = video.target.children[source];
                      if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                        videoSource.src = videoSource.dataset.src;
                      }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                  }
                });
              });

              lazyVideos.forEach(function(lazyVideo) {
                lazyVideoObserver.observe(lazyVideo);
              });
            }
        }
    }

    useEffect(() => {

        // setting route links
        if ( true ){

            let h_routes = [];

            let concerned_array = window.location.pathname.replace("/", "").split("/");

            concerned_array.forEach((el, index)=>{

                let link = "/";

                for (let i = 0; i <= index; i++) { link += concerned_array[i] + "/" };

                h_routes.push(
                <div className="Routes">
                    <Link href={link}>
                        <span className="Routes-text">{ el }</span>
                    </Link>
                </div>)
            });


            set_header_route(
                h_routes
            )
        }

    }, [router])


    useEffect(() => {

        if (typeof window === "undefined") { return; }


        // page redirection to https form http
        if ( false ) { // make it true while building
            if (location.protocol !== 'https:') {
                location.replace(`https:${location.href.substring(location.protocol.length)}`);
            }
        }

        // data fetching from control panel
        // if ( true ){
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("GET", "https://7872-2401-4900-4173-4b12-acfe-890e-81a7-3f9d.in.ngrok.io/api/image/load-image");
        //     [{ name : "Content-Type", value: "application/json" }].forEach( (val) => { xhr.setRequestHeader(val.name, val.value); });

        //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        //     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

        //     xhr.onload = (xhrRes) => {
        //         console.log(xhrRes.currentTarget.responseText);
        //     }

        //     xhr.send();
        // }


        pageMicroHistory.current = {prevPage: pageMicroHistory.current.currentPage, currentPage: router.asPath};
        setPageMicroHistory( {prevPage: pageMicroHistoryState.currentPage, currentPage: router.asPath} );

        // general script on first land on the url
        if (executed.current == 0) {

            // Mouse Cursor Positioning
            if ( true ){
                // Cursor Following

                gsap.to(".mouseCursor", { duration: 0, x: `-5vw`, y:`-5vh`, opacity: 0 })
                document.addEventListener("mousemove", (e) => {

                    let m_pos_l = [];

                    let el = document.querySelector(".mouseCursor");
                    let t = el.style.getPropertyValue("transform");

                    if ( t.substring( t.indexOf("scale(")+6, t.indexOf("scale(")+9) == "0.2" ){
                        m_pos_l = [-document.querySelector(".mouseCursor").clientWidth/3, document.querySelector(".mouseCursor").clientWidth/3]
                    } else {
                        m_pos_l = [10 - document.querySelector(".mouseCursor").clientWidth/2, 10 + document.querySelector(".mouseCursor").clientWidth/2]
                    }

                    let mouseEase = "sine";

                    gsap.to(".mouseCursor", { duration: 0.5, x: `${e.pageX + m_pos_l[0]}px`, y:`${(e.pageY - scrollY) + m_pos_l[1]}}px`, opacity: 1, ease: mouseEase })
                })

            }

			// Header Menu button
			if ( true ){
                menuButton()
			}

            // routeChangeStart
            if ( true ){

                let f_load_s = () => {
                    document.querySelector(".Load-screen").classList.remove("--is-hidden");
                    document.body.style.setProperty("overflow-y", "hidden");
                }

                f_load_s();

                router.events.on("routeChangeStart", (route)=>{
                    if ( pageMicroHistory.current.currentPage !== route ){
                        f_load_s();
                        gsap.fromTo(".Load-screen", { y:"100vh" }, {
                            // duration:1,
                            duration:0.95,
                            y:"0vh",
                            // ease:"power3"
                        });
                    }
                    m_cursor_states("color", {color: "default"});
                });

            }

            // resize event vw size
            if ( true ){

                const resize_ev = () => {
                    document.querySelector("html").style.setProperty("--vw-size-px", window.innerWidth/100);
                    document.querySelector("html").style.setProperty("--vh", window.innerHeight/100);
                }

                resize_ev();
                window.addEventListener("resize", resize_ev);
            }


            executed.current += 1;

        }

        // general script to be executed each time page changes
        if ( executed.current >= 0 ){

            // On page change
            if ( pageMicroHistory.current.prevPage !== pageMicroHistory.current.currentPage ){

                // Mouse Cursor
                if ( true ){
                    el_h_event.current = [];
                    m_cursor_eventListeners();
                }

                // Loading Screen and Locomotive setup
                if ( true ){
                    const load_fn = () => {
                        let load_s_t = 2520; // loading screen time

                        /* test declaration */ load_s_t = 100

                        let locomotice_interv = setInterval(() => {
                            // Locomotive
                            if ( true ){
                                window.scroll(0, 0);
                                if ( locomotiveScrollInstance.current !== undefined && window.innerWidth > 1024 ){
                                    locomotiveScrollInstance.current.destroy();
                                }
                                locomotiveInit();
                            }

                            clearInterval(locomotice_interv);

                        }, load_s_t/10);

                        setTimeout(() => {

                            const load_screen_roll = () => {

                                let loadingScreenInterval = setInterval(() => {
                                    if ( router.isReady === true && ( document.readyState === 'complete' || document.readyState === "interactive" ) )
                                        gsap.to(".Load-screen", {
                                            // duration:1,
                                            duration:0.7,
                                            y:"-100vh",
                                            // ease:"power3",
                                            onComplete:()=>{

                                                document.querySelector(".Load-screen").classList.add("--is-hidden");

                                            }});
                                        clearInterval(loadingScreenInterval);
                                }, 0);

                            }

                            // uncollapse to see the loading screen code
                            if ( router.asPath == "/" ){ // vimeo video

                                if ( window.navigator.onLine ){
                                    let video_url_str = "https://player.vimeo.com/video/7990256990?h=0a152e67e9&title=0&portrait=0&muted=1&autoplay=1&controls=0&dnt=1&loop=1&transparent=0&background=1&app_id=000001";

                                    if ( document.body.clientWidth < 450 )
                                        video_url_str = "https://player.vimeo.com/video/799025729?h=972d4c7b96&title=0&portrait=0&muted=1&autoplay=1&controls=0&dnt=1&loop=1&transparent=0&background=1&app_id=000001";

                                    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
                                    xhr.onload = function(){
                                        // setting the innerHtml of required element
                                        document.querySelector(".vimeo-fullscreenVideo").innerHTML = `<iframe
                                            src="${video_url_str}"
                                            width="640"
                                            height="360"
                                            frameBorder="0"
                                            allow="picture-in-picture"
                                            allowFullScreen=""
                                            title="Another Idea"
                                            data-ready="true"
                                        ></iframe>`; // allow="fullscreen; picture-in-picture"

                                        // Rolling up the loading screen
                                        setTimeout(() => {

                                            let iframe, player;


                                            let iframe_interv = setInterval(() => {

                                                iframe = document.querySelector('.homeHeadSection iframe');

                                                if ( iframe == undefined ) return;

                                                player = new Player(iframe);
                                                player.play();


                                                player.on('bufferend', load_screen_roll);

                                                setTimeout(() => {

                                                    let loadingScreenInterval = setInterval(() => {
                                                        if ( router.isReady === true && ( document.readyState === 'complete' || document.readyState === "interactive" ) )
                                                            gsap.to(".Load-screen", {
                                                                // duration:1,
                                                                duration:0.7,
                                                                y:"-100vh",
                                                                // ease:"power3",
                                                                onComplete:()=>{

                                                                    document.querySelector(".Load-screen").classList.add("--is-hidden");

                                                                }});
                                                            clearInterval(loadingScreenInterval);
                                                    }, 0);

                                                }, load_s_t*2);


                                                clearInterval( iframe_interv );

                                            }, 0);

                                        }, load_s_t*0.1);

                                    }
                                    xhr.onerror = function(){}
                                    xhr.open("GET","https://api.publicapis.org/entries",true);
                                    xhr.send();
                                }

                            } else {
                                load_screen_roll()
                            }

                            { // applying lazy loading code
                                lazy_load()
                            }

                            // Onscroll Animation
                            if ( true ){
                                // Making web gsap scroll trigger compatible
                                initialize_triggers(()=>{});
                            }

                            // on scroll triggers header changes
                            if ( true ){
                                scrollTrigger();
                            }

                        }, load_s_t);
                    }

                    load_fn();
                }

                // Contact Page Header Change
                if ( true ){
                    if ( router.asPath === "/contact" ){
                        document.querySelector(".Header").style.setProperty("display", "none");
                    }
                    else{
                        document.querySelector(".Header").style.removeProperty("display");
                        setHeaderVisibilityState(executed.current);
                    }
                }

                // colorFill Animation
                if ( true && document.body.clientWidth >= 1023 ){
                    trackMouse();

                    var colorFillsFiltered = [... document.querySelectorAll(".colorFill")];

                    if ( executed.current >= 1 ){

                        var unWantedEl = [... document.querySelectorAll(".Header .colorFill")];

                        for (let i = 0; i < unWantedEl.length; i++){
                            let index = colorFillsFiltered.indexOf(unWantedEl[i])
                            if ( index > -1 ){
                                colorFillsFiltered.splice(index, 1);
                            }
                        }

                    }

                    colorFiller(colorFillsFiltered);
                }

                // Event Listeners destroyer
                if ( true && windowListeners.current.listeners != undefined && executed.current > 1 ){
                    windowListeners.current.listeners.forEach(listener => {
                        window.removeEventListener("resize", listener);
                    });
                }

                // Desk or Mob
                if ( true ){

                    let onlyDesk = document.querySelectorAll(".onlyDesk");
                    let onlyMob = document.querySelectorAll(".onlyMob");

                    if ( window.innerWidth <= 1023 ) {
                        onlyDesk.forEach(element => {
                            element.style.setProperty("display", "none");
                        });
                    } else {
                        onlyMob.forEach(element => {
                            element.style.setProperty("display", "none");
                        });
                    }

                }

            }

            // Handling on page change
            if (true){
                var menu_btn_el = document.querySelector(".MenuButton");
                var menu_el = document.querySelector(".Header .Menu")

                gsap.set(menu_el, {display:"none"});
                (document.body || window).style.removeProperty("overflow-y");
                menu_btn_el.classList.remove("menu-open")

                menuState.current = false;
            }

            executed.current += 1;
        }


    }, [router])

    useEffect(() => {

        // Reinitiating Events
        if ( true ){
            menuButton();
            colorFiller(document.querySelectorAll(".Header .colorFill"));
        }

        // Route Labels
        if ( true ){
            if ( pageMicroHistory.current.currentPage !== "/" ){
                document.querySelector(".Header .Header-route").style.removeProperty("display")
            }
            else
                document.querySelector(".Header .Header-route").style.setProperty("display", "none")
        }

        // Desk or Mob
        if ( true ){

            let onlyDesk = document.querySelectorAll(".Header .onlyDesk");
            let onlyMob = document.querySelectorAll(".Header .onlyMob");

            if ( window.innerWidth <= 1023 ) {
                onlyDesk.forEach(element => {
                    element.style.setProperty("display", "none");
                });
            } else {
                onlyMob.forEach(element => {
                    element.style.setProperty("display", "none");
                });
            }

        }

    }, [headerVisibilityState]);


    return (
        <>
            <div className={"Load-screen"}>
                <div className="Load-text">
                    {/* Loading... */}
                    <lottie-player src="/assets/AI_Logo.json"  background="transparent"  speed="1"  style={{width: "180px", height: "180px"}}  loop="true" autoplay></lottie-player>
                    {/* <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_0fvcgy9k.json"  background="transparent"  speed="1"  style={{width: "400px", height: "400px"}}  loop autoplay></lottie-player> */}
                </div>
            </div>

            <>
                {/* Custom Cursor */}
                <div className="mouseCursorContainer">
                    <div className="mouseCursor" style={{transform:"translate3d(0px -50vh, 0px) scale(0.2)", borderColor: "rgb(85, 65, 248)", backgroundColor: "rgb(85, 65, 248)"}}>
                        <div className="mouseCursorContent">
                            <div className="mouseCursorIconWrapper">
                                {m_content_icon}
                            </div>
                            <div className="mouseCursorTextWrapper"></div>
                        </div>

                    </div>
                </div>

                {/* Header */}
                <header className="Header" key={headerVisibilityState}>
                    <div className="Header-wrapper">
                        <div className="Header-route onlyDesk" style={{"display":"none"}}>
                            { pageMicroHistoryState.currentPage === "/" ? "" : (
                                <div className="Route-label">
                                    <div className="Routes">
                                        <Link href={"/"}>
                                            <span className="Routes-text">Home</span>
                                        </Link>
                                    </div>
                                    { header_route }
                                </div>
                            ) }
                        </div>
                        <Link legacyBehavior href="/">
                            <a href="/" className="Header-logoContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="372" height="38" viewBox="0 0 372 38" fill="none">
                                    <g clipPath="url(#clip0_6_14)">
                                        <path d="M26.6152 31.8H8.9092L6.35496 37.36H0L17.5936 0H17.941L35.5346 37.36H29.1695L26.6152 31.8ZM24.347 26.87L17.7775 12.56L11.2387 26.87H24.347Z" fill="white"/>
                                        <path d="M70.7014 0.659985V38H70.4256L46.4974 13.54V37.41H40.6227V0.109985H40.9292L64.8063 24.53V0.659985H70.7014Z" fill="white"/>
                                        <path d="M77.0462 19.1C77.0381 15.3506 78.1672 11.6833 80.2904 8.56247C82.4136 5.44168 85.4354 3.00789 88.9729 1.56941C92.5105 0.130932 96.4047 -0.247514 100.162 0.482015C103.92 1.21154 107.372 3.01622 110.08 5.66743C112.789 8.31865 114.633 11.6971 115.378 15.3748C116.124 19.0525 115.737 22.8641 114.267 26.3265C112.798 29.789 110.311 32.7466 107.122 34.8247C103.934 36.9028 100.187 38.0079 96.3563 38C91.2432 37.9737 86.3472 35.974 82.7316 32.4353C79.1161 28.8965 77.073 24.1045 77.0462 19.1V19.1ZM109.792 19.1C109.81 16.5002 109.039 13.9537 107.577 11.7831C106.115 9.6125 104.027 7.9156 101.579 6.90742C99.1307 5.89925 96.4316 5.6252 93.8239 6.11999C91.2162 6.61479 88.8173 7.85616 86.9312 9.68678C85.0451 11.5174 83.7566 13.8549 83.2292 16.4029C82.7018 18.951 82.9591 21.595 83.9686 23.9998C84.978 26.4045 86.6941 28.4619 88.8995 29.9111C91.1048 31.3602 93.7 32.136 96.3563 32.14C99.9039 32.1296 103.304 30.7504 105.82 28.3016C108.335 25.8529 109.762 22.5322 109.792 19.06V19.1Z" fill="white"/>
                                        <path d="M143.64 6.45H133.618V37.36H127.712V6.45H117.7V0.75H143.64V6.45Z" fill="white"/>
                                        <path d="M177.162 0.75V37.36H171.298V21.9H155.094V37.36H149.25V0.75H155.094V16.19H171.298V0.75H177.162Z" fill="white"/>
                                        <path d="M191.17 6.41V15.79H205.361V21.51H191.17V31.64H207.578V37.36H185.305V0.75H207.578V6.41H191.17Z" fill="white"/>
                                        <path d="M235.184 37.36L225.121 23.19H220.523V37.36H214.648V0.75H226.275C233.233 0.75 238.944 6 238.944 12.52C238.957 14.7643 238.249 16.9558 236.92 18.7844C235.591 20.6131 233.708 21.9864 231.537 22.71L242.428 37.36H235.184ZM226.388 18.42C228.054 18.4448 229.664 17.8312 230.874 16.7102C232.084 15.5892 232.799 14.0496 232.865 12.42C232.842 11.6132 232.655 10.8189 232.316 10.0831C231.977 9.34737 231.492 8.68465 230.89 8.13328C230.287 7.5819 229.579 7.15279 228.807 6.87074C228.034 6.58869 227.212 6.45928 226.388 6.49H220.492V18.49L226.388 18.42Z" fill="white"/>
                                        <path d="M262.157 0.75H268.032V37.36H262.157V0.75Z" fill="white"/>
                                        <path d="M306.111 19.1C306.111 30.35 298.703 37.36 286.831 37.36H276.175V0.750012H286.831C298.703 0.730012 306.111 7.77001 306.111 19.1ZM300.175 19.1C300.175 11.33 295.015 6.47001 286.801 6.47001H281.988V31.64H286.842C295.046 31.64 300.175 26.8 300.175 19.08V19.1Z" fill="white"/>
                                        <path opacity="0.6" d="M344.026 34.75L345.385 31.8L354.243 12.56L363.07 31.8H363.091L365.645 37.36H372L354.406 0H354.059L336.465 37.36H342.82L344.026 34.75Z" fill="#BABCBE"/>
                                        <path d="M318.31 31.64V21.51H335.791L338.488 15.79H318.31V6.41H342.902L345.569 0.75H312.435V37.36H328.322L331.02 31.64H318.31Z" fill="white"/>
                                        <path d="M334.677 37.36H334.718V37.29L334.677 37.36Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_6_14">
                                            <rect width="372" height="38" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </Link>
                        <button aria-label="open menu" className="MenuButton Header-button colorFill" style={{"--x":"30.2695px", "--y":"98.2717px", "--r":"0px", "--ease":"expo"}}>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="MenuButton-border" >
                                <circle cx="50" cy="50" r="49" ></circle>
                            </svg>
                            <span className="MenuButton-bg" ></span>
                            <div className="MenuButton-label" >
                                <span>Menu</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="MenuButton-cross" >
                                <path d="M0 8.6h20v2.7H0V8.6z" ></path>
                                <path d="M8.6 0h2.7v20H8.6V0z" ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="Menu" style={{"background":"rgb(85, 65, 248)", "display":"none"}}>
                        <div className="Menu-bg" style={{"display":"none"}}>
                            <canvas></canvas>
                        </div>
                        <div className="Menu-wrapper">
                            <nav className="Menu-nav">
                                <NavItem
                                    itemNum="01"
                                    linkLabel="Home"
                                    href="/"
                                />
                                <NavItem
                                    itemNum="02"
                                    linkLabel="Work"
                                    href="/work/branding"
                                    subnav={true}
                                />
                                <NavItem
                                    itemNum="03"
                                    linkLabel="About Us"
                                    href="/about"
                                />
                                <NavItem
                                    itemNum="04"
                                    linkLabel="Team"
                                    href="/team"
                                />
                            </nav>
                            <div className="Menu-secondNav">
                                <div className="Menu-quickAccess">
                                    <div className="Menu-quickAccessItem">
                                        <Link legacyBehavior href={"/contact"}>
                                            <a href="/contact" className="Menu-quickAccessItemLink">
                                                Contact us
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="Menu-socials">
                                    <div className="Menu-socialsItem">
                                        <Link href={"https://vimeo.com/showcase/9907768"} passHref legacyBehavior>
                                            <a className="Menu-socialsItemLink" target={"_blank"} rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="Menu-socialsItemIcon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <g clipPath="url(#clip0_3_9)">
                                                        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
                                                        <path d="M17.14 6.10001C17.4676 6.05838 17.8003 6.08937 18.1146 6.19077C18.4288 6.29218 18.7169 6.46151 18.9584 6.68676C19.1999 6.912 19.3888 7.18763 19.5118 7.49409C19.6348 7.80056 19.6888 8.13033 19.67 8.46001C19.7488 9.47362 19.5408 10.4889 19.07 11.39C17.7164 14.2156 15.7525 16.7054 13.32 18.68C12.8316 19.0665 12.2598 19.3336 11.65 19.46C11.3684 19.5377 11.071 19.5379 10.7894 19.4604C10.5077 19.383 10.2522 19.2308 10.05 19.02C9.46635 18.4343 9.05175 17.7019 8.85 16.9C8.4 15.32 8 13.73 7.53 12.15C7.38173 11.5298 7.13168 10.9384 6.79 10.4C6.45 9.89001 6.23 9.84001 5.71 10.14C5.56595 10.209 5.43149 10.2964 5.31 10.4C5.03 10.65 4.85 10.61 4.63 10.3C4.2 9.69001 4.18 9.71001 4.75 9.21001C5.54 8.52001 6.29 7.77001 7.13 7.13001L7.7 6.73001C7.94135 6.52165 8.2327 6.37958 8.54549 6.31773C8.85829 6.25588 9.18178 6.27638 9.48427 6.37721C9.78676 6.47803 10.0578 6.65574 10.271 6.89289C10.4841 7.13005 10.6319 7.41851 10.7 7.73001C10.9476 8.64851 11.1248 9.58456 11.23 10.53C11.3809 11.4847 11.5879 12.4297 11.85 13.36C11.9473 13.7164 12.1027 14.0542 12.31 14.36C12.53 14.64 12.79 14.71 13.05 14.46C14.0567 13.5215 14.7865 12.3247 15.16 11C15.45 9.84001 14.84 9.31001 13.64 9.55001C13.47 9.55001 13.26 9.77001 13.13 9.61001C13 9.45001 13.19 9.26001 13.25 9.09001C13.467 8.38333 13.8641 7.74528 14.4024 7.23857C14.9407 6.73187 15.6015 6.37395 16.32 6.20001C16.5912 6.15133 16.865 6.11795 17.14 6.10001V6.10001Z" fill="#5542F7"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3_9">
                                                        <rect width="24" height="24" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="Menu-socialsItemLabel">
                                                    Vimeo
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link href={"/"} passHref legacyBehavior>
                                <a className="Menu-logoContainer onlyDesk">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="255" height="26" viewBox="0 0 255 26" fill="none">
                                        <g clipPath="url(#clip0_12_104)">
                                            <path d="M18.2104 21.7579H6.09577L4.34813 25.5621H0L12.0377 0H12.2754L24.3132 25.5621H19.958L18.2104 21.7579ZM16.6585 18.3847L12.1636 8.59368L7.68962 18.3847H16.6585Z" fill="white"/>
                                            <path d="M48.3747 0.451572V26H48.1859L31.814 9.2642V25.5963H27.7945V0.0752563H28.0042L44.3411 16.7837V0.451572H48.3747Z" fill="white"/>
                                            <path d="M52.7158 13.0684C52.7103 10.5031 53.4828 7.99381 54.9355 5.85853C56.3882 3.72325 58.4558 2.05803 60.8762 1.07381C63.2967 0.089585 65.9611 -0.169351 68.5321 0.3298C71.103 0.828951 73.4647 2.06373 75.3181 3.87772C77.1714 5.6917 78.433 8.00328 78.943 10.5196C79.453 13.036 79.1884 15.6438 78.1828 18.0129C77.1773 20.3819 75.4759 22.4056 73.2943 23.8274C71.1127 25.2493 68.549 26.0054 65.928 26C62.4296 25.982 59.0797 24.6138 56.6059 22.1926C54.1321 19.7713 52.7342 16.4925 52.7158 13.0684V13.0684ZM75.1206 13.0684C75.133 11.2896 74.6057 9.54725 73.6053 8.06211C72.605 6.57698 71.1767 5.41594 69.5015 4.72613C67.8263 4.03633 65.9795 3.84882 64.1953 4.18736C62.4111 4.52591 60.7697 5.37527 59.4792 6.6278C58.1887 7.88033 57.3072 9.47965 56.9463 11.2231C56.5855 12.9665 56.7615 14.7755 57.4522 16.4209C58.1429 18.0663 59.3171 19.4739 60.826 20.4655C62.3349 21.457 64.1105 21.9878 65.928 21.9905C68.3553 21.9834 70.6819 21.0397 72.4028 19.3643C74.1238 17.6888 75.1003 15.4168 75.1206 13.041V13.0684Z" fill="white"/>
                                            <path d="M98.2803 4.41315H91.4226V25.5621H87.382V4.41315H80.5313V0.513153H98.2803V4.41315Z" fill="white"/>
                                            <path d="M121.216 0.513153V25.5621H117.204V14.9842H106.117V25.5621H102.118V0.513153H106.117V11.0774H117.204V0.513153H121.216Z" fill="white"/>
                                            <path d="M130.8 4.38578V10.8037H140.51V14.7174H130.8V21.6484H142.027V25.5621H126.788V0.513153H142.027V4.38578H130.8Z" fill="white"/>
                                            <path d="M160.916 25.5621L154.03 15.8668H150.884V25.5621H146.865V0.513153H154.82C159.581 0.513153 163.488 4.10526 163.488 8.56631C163.497 10.1019 163.013 11.6013 162.103 12.8525C161.194 14.1037 159.905 15.0433 158.42 15.5384L165.872 25.5621H160.916ZM154.897 12.6032C156.037 12.6201 157.138 12.2003 157.966 11.4333C158.794 10.6663 159.283 9.61286 159.329 8.49789C159.313 7.94584 159.185 7.40241 158.953 6.89899C158.721 6.39556 158.389 5.94213 157.977 5.56487C157.565 5.18761 157.081 4.89401 156.552 4.70103C156.023 4.50804 155.461 4.4195 154.897 4.44052H150.863V12.651L154.897 12.6032Z" fill="white"/>
                                            <path d="M179.371 0.513153H183.39V25.5621H179.371V0.513153Z" fill="white"/>
                                            <path d="M209.444 13.0684C209.444 20.7658 204.376 25.5621 196.253 25.5621H188.962V0.513152H196.253C204.376 0.499467 209.444 5.31631 209.444 13.0684ZM205.383 13.0684C205.383 7.7521 201.852 4.42684 196.232 4.42684H192.939V21.6484H196.26C201.873 21.6484 205.383 18.3368 205.383 13.0547V13.0684Z" fill="white"/>
                                            <path opacity="0.6" d="M235.386 23.7763L236.316 21.7579L242.377 8.59368L248.417 21.7579H248.431L250.178 25.5621H254.526L242.489 0H242.251L230.213 25.5621H234.561L235.386 23.7763Z" fill="#BABCBE"/>
                                            <path d="M217.791 21.6484V14.7174H229.752L231.597 10.8037H217.791V4.38578H234.617L236.442 0.513153H213.771V25.5621H224.642L226.487 21.6484H217.791Z" fill="white"/>
                                            <path d="M228.99 25.5621H229.018V25.5142L228.99 25.5621Z" fill="white"/>
                                        </g>
                                            <defs>
                                                <clipPath id="clip0_12_104">
                                                    <rect width="254.526" height="26" fill="white"/>
                                                </clipPath>
                                            </defs>
                                    </svg>
                                </a>
                            </Link>

                        </div>
                    </div>
                </header>

                {/* Content */}
                <Component {...pageProps}
                    windowListeners={windowListeners.current}
                    locomotiveScrollInstance={locomotiveScrollInstance}
                    cursor_events_listen={m_cursor_eventListeners}
                    m_cursor_states={m_cursor_states}
                    s_trigger_anim={initialize_triggers}
                    s_ref={s_ref}
                    sendSwiperInstance={getSwiperInstance}
                />
            </>
        </>
    );
}

export default MyApp;
