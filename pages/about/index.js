// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Image from "next/image";


// Custom Components
import Footer from "../../components/footer/footer"

function OnBoardItem(props){

    // const executed = useRef(0);

    // useEffect(() => {
	// 	if (typeof window === "undefined") { return; }
    //     if ( !executed.current){

    //         { // particles
    //             var canvas = document.querySelector(".ExpertItem-canvas-"+props.index+" canvas"),
    //             canvasContainer = document.querySelector(".ExpertItem-canvas-"+props.index),
    //             ctx = canvas.getContext("2d"),
    //             particles = [],
    //             amount = 0,
    //             mouse = {x:0,y:0},
    //             radius = 3;

    //             var colors = ["#fff","#5541F8","#373737"];
    //             var amount = 20;

    //             let canvas_ratio = canvasContainer.clientWidth/canvasContainer.clientHeight

    //             var ww = canvas.width = 1152;
    //             var wh = canvas.height = 1152/canvas_ratio;

    //             function Particle(x,y){
    //                 this.x =  (Math.random()*ww);
    //                 this.y =  (Math.random()*wh);
    //                 this.dest = {
    //                     x: x,
    //                     y: y
    //                 };

    //                 if ( this.x > ww*0.95 ){
    //                     this.x = ww*0.95
    //                 }
    //                 else if ( this.x < ww*0.05 ){
    //                     this.x = ww*0.05
    //                 }
    //                 if ( this.y > wh*0.95 ){
    //                     this.y = wh*0.95
    //                 }
    //                 else if ( this.y < wh*0.05 ){
    //                     this.y = wh*0.05
    //                 }

    //                 this.r =  (Math.random()*14 + 5);
    //                 this.vx = ((Math.random()-0.5));
    //                 this.vy = ((Math.random()-0.5));

    //                 this.accX = 0;
    //                 this.accY = 0;

    //                 this.color = colors[Math.floor(Math.random()*(colors.length+1))];
    //             }

    //             Particle.prototype.render = function() {

    //                 if ( this.x + this.vx > ww - this.r ){
    //                     this.vx = -this.vx;
    //                 } else if ( this.x + this.vx < 0 + this.r ) {
    //                     this.vx = -this.vx;
    //                 }
    //                 if ( this.y + this.vy > wh - this.r  ){
    //                     this.vy = -this.vy;
    //                 } else if ( this.y + this.vy < 0 + this.r ) {
    //                     this.vy = -this.vy;
    //                 }

    //                 this.x += this.vx;
    //                 this.y += this.vy;

    //                 ctx.fillStyle = this.color;
    //                 ctx.beginPath();
    //                 ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    //                 ctx.fill();

    //             }

    //             function initScene(){
    //                 var ww = 1152;
    //                 var wh = 1152;

    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //                 ctx.globalCompositeOperation = "screen";

    //                 particles = [];

    //                 for (let i = 0; i < amount; i++) {
    //                     particles.push(new Particle( Math.round(Math.random()*ww), Math.round(Math.random()*wh)));
    //                 }
    //             }

    //             function onMouseMove(e){
    //                 // adjusted to take it relative to canvas
    //                 mouse.x = ww * Math.floor(1000*(e.clientX - canvas.getBoundingClientRect().left)/canvasContainer.clientWidth)/1000;
    //                 mouse.y = wh * Math.floor(1000*(e.clientY - canvas.getBoundingClientRect().top)/canvasContainer.clientWidth)/1000;
    //             }

    //             // this function is called repeatedly many times
    //             function render(a) {
    //                 requestAnimationFrame(render);
    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //                 for (var i = 0; i < amount; i++) {
    //                     particles[i].render();
    //                 }
    //             };
    //         }

    //         executed.current = 1;
    //     }
    // }, [])



    return (
        <div className="OnBoard-listItem">
            <div className="OnBoard-ProfileDetail">
                <div className="ExpertItem large visible OnBoardDirector-Profile" style={{"--color": props.G_El_prop[0], "--move-duration": props.G_El_prop[1]}}>
                    <div className="ExpertItem-wrapImage" style={{"transform": "translate3d(0px, 0px, 0px)", opacity: 1}}>
                        <div className="ExpertItem-wrapImageInner">
                            <div className="AppImage ExpertItem-image loaded lazyload fit-cover"
                                style={{"--ratio": "0%"}}>
                                <div className="AppImage-overlay"></div>
                                <div className="AppImage-placeholder" style={{"backgroundColor": "rgb(127, 128, 127)"}}></div>
                                <picture>
                                    <Image fill draggable="false"
                                        alt={props.name} className="AppImage-image"
                                        style={{"objectFit": "cover", "objectPosition": "center center"}}
                                        src={props.imgSrc} />
                                </picture>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <filter id="fancy-goo">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur">
                                        </feGaussianBlur>
                                        <feColorMatrix in="blur" mode="matrix"
                                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix>
                                    </filter>
                                </defs>
                            </svg>
                            <div className="ExpertItem-blob"
                                style={{"transform": props.G_El_prop[2], "--hov-transform":props.G_El_prop[3]}}>
                                <svg width="600" height="600" viewBox="0 0 600 600" className="ExpertItem-blobSvg">
                                    <path>
                                        <animate attributeName="d" dur="47s" repeatCount="indefinite"
                                            values="M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;
                                                        M404.4 176.7c20.9 16.4 20.8 58.8 38.8 106.2 18.1 47.4 54.4 99.7 40.9 123.6-13.5 23.9-76.7 19.3-131.6 40.4-54.8 21-101.2 67.7-150.5 71.7-49.4 4.1-101.7-34.5-107.8-81.9C88 389.2 128 333 144.2 278c16.2-55.1 8.5-108.8 30.5-125 22-16.1 73.7 5.5 120.4 11.3 46.7 5.9 88.5-3.9 109.3 12.4z;
                                    M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;"
                                            keySplines="0.1 0.8 0.2 1;0.1 0.8 0.2 1" keyTimes="0;0.5;1"></animate>
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="ExpertItem-content">
                        <div className="ExpertItem-title app-text--regular"
                            style={{opacity: 1, transform: "translate3d(0px, 0px, 0px)"}}>
                            {props.name}
                        </div>
                        {/* <div className="ExpertItem-position"
                            style={{opacity: 1, transform: "translate3d(0px, 0px, 0px)"}}>
                            {props.postion}
                        </div> */}
                    </div>
                    <div className={"ExpertItem-canvas ExpertItem-canvas-"+props.index}>
                        <canvas width="1152" height="1152"></canvas>
                    </div>
                </div>
                <div className="OnBoardDirector-About">
                    <p>{props.about}</p>
                </div>
            </div>
            <div className="OnBoard-ProfileExtraDetail">
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export default function About(){

    const executed = useRef(0);
    const [random_pos, set_random_pos] = useState([]);

    const [profiles, set_profiles] = useState([]);

    const pos_set = [[-10, -10], [10, -10], [10, 10], [-10, 10]];

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            let positions = [];
            for (let i = 0; i < 3; i++) {
                let random_set = Math.floor(Math.random()*4)

                let random_orientation = (Math.random()*180)
                let random_pos_hov = [(pos_set[random_set][0] - Math.random()*3), (pos_set[random_set][1] - Math.random()*3)]
                let random_pos_n_hov = [random_pos_hov[0]*2.8 , random_pos_hov[1]*2.8]

                positions.push(
                    {
                        not_hov:`translate3d(calc(${random_pos_n_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_n_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`,
                        hov:`translate3d(calc(${random_pos_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`,
                    }
                )
            }
            set_random_pos(positions)

            executed.current = 1;
        }
    }, []);

    useEffect(() => {

        if ( random_pos.length > 1 ){

            set_profiles(
                [<OnBoardItem
                    key={1}
                    index={1}
                    imgSrc = "/assets/Jaideep-Gandhi-Photo_Square.jpg"
                    name = "Jaideep Gandhi"
                    G_El_prop = {["#5541f8", `${20 + 50*Math.random()}s`, random_pos[0].not_hov, random_pos[0].hov]}
                    about = {
                        <>Founder of Another Idea - A 360 degree Marketing Agency specialized in the realm of Real Estate. Someone who has eaten, breathed & survived in the real-estate industry panning strategy, creativity, sales, consultation, events, workshops, and still adding new feathers to his hat.</>
                    }
                    detail = {<>
                        <h1 className="app-text--regular onlyDesk" >
                            Along with breathing through the bricks and beams,<br/>
                            Serving the advertising, real estate and educational sector as:
                        </h1>
                        <h1 className="app-text--regular onlyMob" >
                            Along with breathing through the bricks and beams,
                            Serving the advertising, real estate and educational sector as:
                        </h1>
                        <ul>
                            <li>Honorable Treasurer of the IAA, since September 2022</li>
                            <li>Honorable Secretary of the IAA, since September 2019</li>
                            <li>Chairman of Goafest from 2021 to 2023 (present)</li>
                            <li>Former Treasurer of the IAA from 2006 to 2019</li>
                            <li>Committee Member of Advertising Agencies Association of India (AAAI) since <style>2014</style></li>
                            <li>Honorary Secretary of Advertising Agencies Association of India (AAAI) since 2019</li>
                            <li>Former Co-Chairman of Goafest in 2019</li>
                            <li>STACA- Trustee, as of 2020</li>
                            <li>Representative of the Advertising Council Of India on Asian Advertising Federation Association ( AAFA) Board</li>
                            <li>Strategy advisor on the board of Niranjan Hiranandani School of Management and Real Estate</li>
                            <li>Honorary advisor and a Jury member for Realty Plus Media</li>
                            <li>An Editorial Consultant (Real Estate) to DNA, a leading newspaper ( 2014 to 2017)</li>
                            <li>Quality Control Advisor- HSNC University, Churchgate Mumbai</li>
                            <li>Prestigious Speaker and Regular Guest Lecturer at KC College, Churchgate Mumbai</li>
                        </ul>
                    </>
                    }
                />]
            )

        }


    }, [random_pos])


    return (
        <div className="About-page" data-scroll-container>
            <Head><title>About Us</title></Head>

            <section className="Directors-onBoard">
                <div className="Title u-textUppercase">
                    <h1 className="HomeTitle-title">About US</h1>
                </div>
                <div className="Paragraph">
                    <p className="Aboutus-p onlyDesk app-text--large" >We are an advertising agency that can help deliver strategic value to our clients.
                    We provide a complete spectrum of services that enable brands to interface with target audiences at multiple touch points.
                    To define the true essence or distinguishing hallmark of your brand vis-a-vis competition is what we oversee for you. As well as to percolate this brand essence into project based communication endeavours.
                    We optimize a brand’s success potential through accurate planning and insightful implementation of communication initiatives.
                    </p>
                    <p className="Aboutus-p onlyMob app-text--large" >We are an advertising agency that can help deliver strategic value to our clients.
                    We provide a complete spectrum of services that enable brands to interface with target audiences at multiple touch points.
                    To define the true essence or distinguishing hallmark of your brand vis-a-vis competition is what we oversee for you. As well as to percolate this brand essence into project based communication endeavours.
                    We optimize a brand’s success potential through accurate planning and insightful implementation of communication initiatives.
                    </p>
                </div>
                <div className="OnBoard-wrapper">
                    <div className="OnBoard-listItems">
                        { profiles }
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </div>
    )
}