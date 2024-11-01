import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "cafe.jpg"
    },
    {
        color: "#d6d7dc",
        src: "corporate-1.jpg"
    },
    {
        color: "#e3e3e3",
        src: "corporate-2.jpg"
    },
    {
        color: "#21242b",
        src: "corporate-3.jpg"
    }
];

const slider2 = [
    {
        color: "#d4e3ec",
        src: "restraunt-1.jpg"
    },
    {
        color: "#e5e0e1",
        src: "restraunt-2.jpg"
    },
    {
        color: "#d7d4cf",
        src: "restraunt-3.jpg"
    },
    {
        color: "#e1dad6",
        src: "restraunt-4.jpg"
    }
];

export default function Index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    return (
        <div ref={container} className={styles.slidingImages}>
            <h1 className={styles.header}>Gallery</h1>
            <motion.div style={{ x: x1 }} className={styles.slider}>
                {slider1.map((project, index) => (
                    <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
                        <div className={styles.imageContainer}>
                            <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
                        </div>
                    </div>
                ))}
            </motion.div>
            <motion.div style={{ x: x2 }} className={styles.slider}>
                {slider2.map((project, index) => (
                    <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
                        <div className={styles.imageContainer}>
                            <Image fill={true} alt={"image"} src={`/images/${project.src}`} />
                        </div>
                    </div>
                ))}
            </motion.div>
            <motion.div style={{ height }} className={styles.circleContainer}>
                <div className={styles.circle}></div>
            </motion.div>
        </div>
    );
}
