import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import Link from 'next/link';

export default function Index() {  // Changed from index to Index
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });
    
    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    return (
        <motion.div style={{ y }} ref={container} className={`${styles.contact} mt-[50vh] lg:mt-[5vh]`}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                                fill={true}
                                alt="image"  // Changed to use double quotes
                                src={`/images/Logo1.png`}
                                className={styles.img}
                            />
                        </div>
                        <h2>Let&apos;s work</h2> 
                    </span>
                    <h2 className='text-center'>Together</h2>
                    <motion.div style={{ x }} className={styles.buttonContainer}>
                        <Rounded backgroundColor="#334BD3" className={styles.button}>
                            <Link href={"/quote"}>
                                <p>Get in touch</p>
                            </Link>
                        </Rounded>
                    </motion.div>
                    <motion.svg style={{ rotate, scale: 2 }} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                    <div>
                        <p>info@muralinterior.in</p>
                    </div>
                    <div>
                        <p>+91 9892110142</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>socials</h3>
                            <Magnetic>
                                <a href="https://www.instagram.com/mural.interior/?igsh=MW5sZnVwcWNycG80eg%3D%3D" style={{ textDecoration: 'none', color: 'white' }}>
                                    <p>Instagram</p>
                                </a>
                            </Magnetic>
                        </span>
                        
                        
                        <Magnetic>
                            <p>Linkedin</p>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
