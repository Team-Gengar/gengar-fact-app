import { useEffect } from 'react';
import * as React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from '../../components/layout.module.css';
import { useSession, getSession } from 'next-auth/react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react';



async function getFact(): Promise<void> {
  const elem = document.querySelector('input[name=fact-category-type]:checked');
  let category = null;
  if (!elem) {
    const categories = ['cat', 'dog'];

    category = categories[Math.floor(Math.random() * 2)];
  } else {
    const str = (elem as HTMLInputElement).value;
    category = str.substring(0, str.indexOf('-'));
  }


  const response = await fetch('http://localhost:3000/api/facts/' + category);
  const fact = await response.json();
  console.log(fact);
  addToFeed(category[0].toUpperCase() + category.substring(1), fact);
}


/**
 * We're creating a new div element, adding a label and a fact to it, and then appending it to the feed
 * @param {string} labelText - string - The label text to be displayed above the fact.
 * @param {string} factText - string - The text of the fact that will be displayed
 */
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



function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () =>{
    signOut();
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
                <Image
                id={styles.gearIcon}
                src='/images/gear.png'
                height={32}
                width={32}
                alt="Settings icon"
              />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button onClick={handleLogout} sx={{ p: 2 }}>Logout</Button>
      </Popover>
    </div>
  );
}




export default function Home() {
  const { data: session, status } = useSession();
    useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('unauthenticated');
      window.location.href = '/login';
    }
  });
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
            <BasicPopover/>
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