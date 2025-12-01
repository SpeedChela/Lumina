import Image from "next/image";
import styles from "./nosotros.module.css";
import Link from "next/link";

export default function Nosotros() {
    return (
        <section className={styles.container}>
            <div>
                <Link href="/" className={styles.backBtn}> ← Volver al inicio</Link>
            </div>
            <h1 className={styles.title}>Sobre Nosotros</h1>

            <div className={styles.block}>
                <div className={styles.text}>
                    <h2>Nuestra Historia</h2>
                    <p>
                        En <strong>Lumina</strong>, creemos que cada joya cuenta una historia. 
                        Nacimos con la pasión de crear piezas que acompañen momentos especiales 
                        y que reflejen la elegancia que vive en cada persona.
                    </p>
                </div>

                <Image
                    src="/Images/nosotros.webp"
                    alt="Joyería elegante Lumina"
                    width={450}
                    height={450}
                    className={styles.img}
                />
            </div>

            <div className={styles.blockReverse}>
                <Image
                    src="/Images/nosotros1.webp"
                    alt="Diseño de joyería Lumina"
                    width={450}
                    height={450}
                    className={styles.img}
                />

                <div className={styles.text}>
                    <h2>Nuestra Filosofía</h2>
                    <p>
                        Cada pieza es creada con dedicación, cuidando cada detalle para lograr un 
                        equilibrio perfecto entre diseño, brillo y durabilidad.
                    </p>
                </div>
            </div>

            <div className={styles.values}>
                <h2>Valores que nos definen</h2>
                <ul>
                    <li>✦ Calidad: materiales cuidadosamente seleccionados.</li>
                    <li>✦ Elegancia: diseños que destacan con sutileza.</li>
                    <li>✦ Confianza: piezas hechas para durar.</li>
                    <li>✦ Pasión: amor por la joyería fina.</li>
                </ul>
            </div>

            <div className={styles.finalBlock}>
                <h2>Nuestro Compromiso</h2>
                <p>
                    En Lumina no solo vendemos joyas: creamos experiencias. Cada pieza está hecha 
                    para iluminar tus momentos más importantes y acompañarte con elegancia.
                </p>
            </div>
        </section>
    );
}
