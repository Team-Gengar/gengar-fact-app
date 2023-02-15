import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from '../../components/layout.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <div className={styles.feed}>
          <h1>Homepage</h1>
          <h2>Most recent facts:</h2>
          <h3>Fact 1:</h3>
          <p>Cats have an extra organ that allows them to taste scents on the air, which is why your cat stares at you with her mouth open from time to time.</p>
          <h3>Fact 2:</h3>
          <p>Female cats have the ability to get pregnant when they are only 4 months old!</p>
          <h3>Fact 3:</h3>
          <p>Cats find it threatening when you make direct eye contact with them.</p>
          <h3>Fact 1:</h3>
          <p>Cats have an extra organ that allows them to taste scents on the air, which is why your cat stares at you with her mouth open from time to time.</p>
          <h3>Fact 2:</h3>
          <p>Female cats have the ability to get pregnant when they are only 4 months old!</p>
          <h3>Fact 3:</h3>
          <p>Cats find it threatening when you make direct eye contact with them.</p>
        </div>
        <div className={styles.actionPanel}>
          <div className={styles.navbar}>
            <Link href='/'>
              <Image
                src='/images/gear.png'
                height={32}
                width={32}
                alt="Settings icon"
              />
            </Link>
          </div>
          <div className={styles.generateFactPanel}>
            <h1>Fact Type:</h1>
            <div className={styles.generateFactForm}>
              <div>
              <input type="radio" id="cat-fact-category" name="fact-category-type" value="cat-fact-category" />
              <label htmlFor="cat-fact-category">Cat Fact</label><br />
              </div>
              <div>
              <input type="radio" id="dog-fact-category" name="fact-category-type" value="dog-fact-category" />
              <label htmlFor="dog-fact-category">Dog Fact</label><br />
              </div>
              <button className={styles.generateFactSubmitButton} onClick={
                () => {
                  const elem = document.querySelector('input[name=fact-category-type]:checked');
                  console.log(elem ? (elem as HTMLInputElement).value : null)
                }
              } >Get Fact</button>
            </div>
          </div>
        </div>
      </ Layout>
    </>
  )
}