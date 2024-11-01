import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';

export default function Index() { // Changed from index to Index

    const phrase = "At Mural Interior, we specialize in creating stunning murals that elevate audience engagement in today's digital landscape. Our mission is to help brands stand out by turning high-traffic locations into captivating visual experiences. Together, we’ll redefine the status quo with creativity that cuts through the noise. No nonsense, just cutting-edge artistry";
    const description = useRef(null);
    const isInView = useInView(description);

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            return (
                                <span key={index} className={`${styles.mask}`}>
                                    <motion.span 
                                        variants={slideUp} 
                                        custom={index} 
                                        animate={isInView ? "open" : "closed"} 
                                        key={index}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            );
                        })
                    }
                </p>
                <motion.p 
                    variants={opacity} 
                    animate={isInView ? "open" : "closed"}
                >
                    Our team’s passion for art, creativity, and engagement uniquely positions us in the mural design landscape, enabling us to help brands connect with their audiences in vibrant and impactful ways.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <p>About Us</p>
                    </Rounded>
                </div>
            </div>
        </div>
    );
}
