import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby='hero-title'>
            <div className={styles.innerFlex}>
                <div className={styles.heroImg}>
                    <Image
                        src="/Images/rncda.png"
                        alt="Collar elegante de la colección"
                        width={800}
                        height={600}
                        style={{ maxWidth: "300px", width: "100%", margin: "1rem 0", borderRadius: "12px" }}
                    />
                </div>
                <div className={styles.heroContent}>
                    <h1>Revisa nuestra coleccion de anillos </h1>
                    <h2>*Diseños unicos que celebran cada momento especial</h2>
                    <h2>*Piezas elegantes con acabados perfectos para destacar</h2>
                    <h2>*Encuentra el anillo ideal para ti o para regalar a alguien especial</h2>
                    <a className={styles.cta}>Ver Coleccion</a>
                </div>
            </div>
        </section>
    )  
}