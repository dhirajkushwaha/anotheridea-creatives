// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Image from "next/image";


// Custom Components
import Footer from "../../components/footer/footer"


function OtherDirectorItem(props){
    return (
        <div className="OtherDirectors-ListItem">
        <div className="ExpertItem small visible" style={{"--color": props.G_El_prop[0], "--move-duration": props.G_El_prop[1]}}>
            <div className="OtherDirectors-Image ExpertItem-wrapImage" style={{"transform": "translate3d(0px, 0px, 0px)", opacity: 1}}>
                <div className="ExpertItem-wrapImageInner">
                    <div className="AppImage ExpertItem-image loaded lazyload fit-cover"
                        style={{"--ratio": "0%"}}>
                        <div className="AppImage-overlay"></div>
                        <div className="AppImage-placeholder" style={{"backgroundColor": "rgb(127, 128, 127)"}}></div>
                        <picture>
                            <Image  fill draggable="false"
                                alt={props.name} className="AppImage-image OtherDirectors-Image"
                                style={{objectFit: "cover", "object-position": "center center"}}
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
                        {/* {G_EL_anim.current[0]} */}
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
                <div className="ExpertItem-title app-text--regular">
                    {props.name}
                </div>
                <div className="ExpertItem-designation app-text--small">
                    {props.about}
                </div>
            </div>
        </div>
    </div>
    )
}


export default function Team(){

    const executed = useRef(0);

    const pos_set = [[-10, -10], [10, -10], [10, 10], [-10, 10]];
    const [profiles_comp, set_profiles_comp] = useState([]);

    const profiles = [
        ["/assets/jaideep-gandhi.jpeg", "Jaideep Gandhi", "Founder"],
        ["/assets/chetna-gandhi.jpeg", "Chetna Gandhi", "Co-Founder"],
    ]


    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            {// Profiles content
                let profiles_comp_copy = [];

                for (let i = 0; i < profiles.length; i++) {
                    let random_set = Math.floor(Math.random()*4)

                    let random_orientation = (Math.random()*180)
                    let random_pos_hov = [(pos_set[random_set][0] - Math.random()*3), (pos_set[random_set][1] - Math.random()*3)]
                    let random_pos_n_hov = [random_pos_hov[0]*2.8 , random_pos_hov[1]*2.8]

                    profiles_comp_copy.push(
                        <OtherDirectorItem
                            imgSrc = {profiles[i][0]}
                            name = {profiles[i][1]}
                            about = {profiles[i][2]}
                            G_El_prop = {["#5541f8",
                                        `${20 + 50*Math.random()}s`,
                                        `translate3d(calc(${random_pos_n_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_n_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`,
                                        `translate3d(calc(${random_pos_hov[0]} * var(--scale_f) * 1vw), calc(${random_pos_hov[1]} * var(--scale_f) * 1vw), 0px) rotate(${random_orientation}deg)`]
                                    }
                        />)
                }

                set_profiles_comp(profiles_comp_copy);
            }

            executed.current = 1;
        }
    }, [])


    useEffect(() => {

        if (false){// Particles

            var canvas = document.querySelector(".ExpertItem-canvas-large canvas"),
            canvasContainer = document.querySelector(".ExpertItem-canvas-large"),
            mainContainer = document.querySelector(".OnBoard-wrapper"),
            ctx = canvas.getContext("2d"),
            particles = [],
            amount = 0,
            mouse = {x:0,y:0},
            radius = 2,
            friction = 0.5;


            var colors = ["#fff", "#5541F8", "#373737", "#3ab8c9", "#f2ad45"];
            var amount = 100;

            var ww = canvas.width = mainContainer.getBoundingClientRect().width;
            var wh = canvas.height = mainContainer.getBoundingClientRect().height;

            function Particle(x,y){
                this.x =  (Math.random()*ww);
                this.y =  (Math.random()*wh);
                this.dest = {
                    x: x*100,
                    y: y*100
                };

                if ( this.x > ww*0.95 ){
                    this.x = ww*0.95
                }
                else if ( this.x < ww*0.05 ){
                    this.x = ww*0.05
                }
                if ( this.y > wh*0.95 ){
                    this.y = wh*0.95
                }
                else if ( this.y < wh*0.05 ){
                    this.y = wh*0.05
                }

                this.r =  (Math.random()*4 + 2);
                this.vx = ((Math.random()-0.5))/10;
                this.vy = ((Math.random()-0.5))/4;

                this.ivx = this.vx;
                this.ivy = this.vy;

                this.accX = 0;
                this.accY = 0;

                this.color = colors[Math.floor(Math.random()*(colors.length+1))];
            }

            Particle.prototype.render = function() {

                if ( this.x + this.vx > ww - this.r ){
                    this.vx = -this.vx;
                } else if ( this.x + this.vx < 0 + this.r ) {
                    this.vx = -this.vx;
                }
                if ( this.y + this.vy > wh - this.r  ){
                    this.vy = -this.vy;
                } else if ( this.y + this.vy < 0 + this.r ) {
                    this.vy = -this.vy;
                }

                this.x += this.vx;
                this.y += this.vy;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
                ctx.fill();

            }

            function initScene(){
                var ww = canvas.width = mainContainer.getBoundingClientRect().width;
                var wh = canvas.height = mainContainer.getBoundingClientRect().height;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "screen";

                particles = [];

                for (let i = 0; i < amount; i++) {
                    particles.push(new Particle( Math.round(Math.random()*ww), Math.round(Math.random()*wh)));
                }
            }

            function onMouseMove(e){
                // adjusted to take it relative to canvas
                // mouse.x = ww * Math.floor(1000*(e.clientX - canvas.getBoundingClientRect().left)/canvasContainer.clientWidth)/1000;
                // mouse.y = wh * Math.floor(1000*(e.clientY - canvas.getBoundingClientRect().top)/canvasContainer.clientHeight)/1000;
                mouse.x = ww * Math.floor(1000*(e.clientX - mainContainer.getBoundingClientRect().left)/canvasContainer.clientWidth)/1000;
                mouse.y = wh * Math.floor(1000*(e.clientY - mainContainer.getBoundingClientRect().top)/canvasContainer.clientHeight)/1000;
            }

            // this function is called repeatedly many times
            function render(a) {
                requestAnimationFrame(render);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < amount; i++) {
                    particles[i].render();
                }
            };

            // mainContainer.addEventListener("mousemove", onMouseMove);
            // initScene();
            // requestAnimationFrame(render);

        }


    }, [profiles_comp])


    return (
        <div className="About-page Team-page" data-scroll-container>
            <Head><title>Team - Another Idea</title></Head>

            <section className="Directors-onBoard">
                <div className="Title u-textUppercase">
                    <h1>The Team</h1>
                </div>
                <div className="OnBoard-wrapper">
                    <div className="OnBoard-listItems">
                        <div className="OnBoard-listItem OtherDirectors-List">
                            <div className="OtherDirectors-ListItems">
                                {profiles_comp}
                            </div>
                            <div className="OnBoard-p" >
                                <div className="Paragraph">
                                    <h1>Our Team consists </h1>
                                    <ul className="Employee-counts" >
                                        {/* <li>Client Team of 8 brand managers</li> */}
                                        <li className="Counts" >
                                            <div className="Counts-figure" >
                                                <h1>8</h1>
                                                <div className="Figure-background" ></div>
                                            </div>
                                            <h4>Brand Manager</h4>
                                        </li>
                                        <li className="Counts" >
                                            <div className="Counts-figure" >
                                                <h1>10</h1>
                                                <div className="Figure-background" ></div>
                                            </div>
                                            <h4>Design Innovators</h4>
                                        </li>
                                        <li className="Counts" >
                                            <div className="Counts-figure" >
                                                <h1>10</h1>
                                                <div className="Figure-background" ></div>
                                            </div>
                                            <h4>Creative Copywriters</h4>
                                        </li>
                                        <li className="Counts" >
                                            <div className="Counts-figure" >
                                                <h1>11</h1>
                                                <div className="Figure-background" ></div>
                                            </div>
                                            <h4>Technical Experts</h4>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"ExpertItem-canvas-large"}>
                        <canvas width="1152" height="1152"></canvas>
                    </div>
                </div>

            </section>

            <Footer></Footer>
        </div>
    )
}