import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function SvgAnimate() {
    const containerRef = useRef(null);

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch("/images/city.svg");
                const svgText = await response.text();
                const bgCityElement = document.getElementById("bg_city");
                bgCityElement.innerHTML = svgText;

                const svgElement = bgCityElement.querySelector("svg");
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
                svgElement.removeAttribute("height");

                svgElement.style.height = "100vh";
                svgElement.style.width = "100vw"; // Optional for consistency

                setAnimationScroll(svgElement);
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        const setAnimationScroll = (svgElement) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1000",
                    scrub: true, // Enables smooth interpolation during scroll
                    pin: true,
                },
            });
        
            // Define the animation sequence
            timeline
                // Scale and fade out the entire SVG as the scroll progresses
                .to(svgElement, { scale: 1.5, opacity: 0.5, duration: 2 }) // Initial scale and opacity
                .to("#full_city", { opacity: 0, duration: 5 })
                .to("#building_top", { y: -200, opacity: 0, duration: 5 }, "-=1")
                .fromTo(
                    "#text_1",
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 2 }, // Smooth fade-in for text
                    "-=2"
                )
                .to(svgElement, { opacity: 0.4, duration: 1 }) // Adjust SVG opacity
                .to("#wall_side", { x: -200, opacity: 0, duration: 5 }, "-=1")
                .to("#wall_front", { x: 200, y: 200, opacity: 0, duration: 5 }, "-=1")
                .fromTo(
                    "#text_2",
                    { opacity: 0, x: -100 },
                    { opacity: 1, x: 0, duration: 2 }, // Smooth fade-in for text 2
                    "-=1"
                )
                .to(svgElement, { opacity: 0.3, duration: 1 }) // Further reduce opacity for the background
                .to("#interior_wall_side", { x: -200, opacity: 0, duration: 5 }, "-=1")
                .to("#interior_wall_top", { y: -200, opacity: 0, duration: 5 }, "-=1")
                .fromTo(
                    "#text_3",
                    { opacity: 0, y: -100 },
                    { opacity: 1, y: 0, duration: 2 }, // Smooth fade-in for text 3
                    "-=1"
                )
                .to(svgElement, { opacity: 0.3, duration: 1 }) // Even less opacity
                .to("#interior_wall_front", { opacity: 0, duration: 5 })
                .fromTo(
                    "#text_4",
                    { opacity: 0, y: -100 },
                    { opacity: 1, y: 0, duration: 2 }, // Final text fade-in
                    "-=1"
                );
        };
        
        

        loadSVG();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`bg-black text-white font-poppins justify-center text-center mx-auto h-[130vh] mt-20`}
        >
            <div className={`relative h-[100vh] flex justify-center items-center`}>
                <div id="bg_city" className={`${styles.bg_city} h-[100vh]`}></div>

                <div className={`${styles.text_content} absolute inset-0 flex flex-col justify-center items-center space-y-8 mt-20`}>
                    <h1 id="text_1" className="opacity-0 text-4xl lg:text-7xl font-bold font-mono">
                        We start by identifying the best location for your mural, ensuring maximum impact and engagement.                    
                    </h1>
                    <h2 id="text_2" className="opacity-0 text-2xl lg:text-4xl font-bold font-mono">
                        Our team designs a mural tailored to your space, reflecting your style and vision.                    
                    </h2>
                    <p id="text_3" className="opacity-0 text-xl lg:text-2xl font-bold font-mono">
                        Our skilled artists meticulously paint the mural, turning your wall into a stunning     
                        masterpiece                    
                    </p>
                    <p id="text_4" className="opacity-0 text-xl lg:text-2xl font-bold font-mono">
                        We deliver a beautifully transformed space, ready to captivate and inspire.                   
                    </p>
                </div>
            </div>
        </div>
    );
}
