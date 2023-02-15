import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from '../../components/layout.module.css';

const getFact = (): void => {

  const elem = document.querySelector('input[name=fact-category-type]:checked');
  if (elem) {
    const str = (elem as HTMLInputElement).value;
    const category = str.substring(0, str.indexOf('-'));
    addToFeed(category, `${category}s are the best!`);
  }
}

const addToFeed = (labelText: string, factText: string): void => {
  const feed = document.getElementById('feed');
  
  const node: HTMLDivElement = document.createElement('div');
  const label: HTMLHeadingElement = document.createElement('h3');
  label.innerText = `${labelText} Fact:`;
  const fact: HTMLParagraphElement = document.createElement('p');
  fact.innerText = factText;

  node.appendChild(label);
  node.appendChild(fact);

  feed?.appendChild(node);
  node.scrollIntoView();
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <div className={styles.feedContainer}>
          <div>
            <h2 id={styles.sticky}>Most recent facts:</h2>
          </div>
          <div id="feed" className={styles.feed}>
          </div>
        </div>
        <div className={styles.actionPanel}>
          <div className={styles.navbar}>
            <Link href='/'>
                <Image
                id={styles.gearIcon}
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
                  getFact();
                }
              } >Get Fact</button>
            </div>
          </div>
        </div>
      </ Layout>
    </>
  )
}