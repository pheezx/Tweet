import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";
import TweetForm from "../components/TweetForm";
import TimelineTweet from "../components/TimelineTweet";
import StarsSvg from "../components/svgs/Stars";

// server code
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const twits = await prisma.twit.findMany({ orderBy: { createdAt: "desc" } });

  return {
    props: {
      twits: twits.map((data) => ({
        ...data,
        createdAt: data.createdAt.getTime(),
      })),
    },
  };
}

const saveTwit = async (data) => {
  await fetch("/api/twit", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export default function Home({ twits }) {
  const onSubmit = async (data) => {
    try {
      await saveTwit(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Twit your thoughs</title>
        <meta name="description" content="A place for sharing your thoughts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.timelineContainer}>
        <div className={styles.heading}>
          <div className={styles.title}>Home</div>
          <div className={styles.starsSvgContainer}>
            <StarsSvg />
          </div>
        </div>
        <TweetForm onSubmit={onSubmit} />
        <div className={styles.divider}></div>
        {twits.map((data) => (
          <TimelineTweet key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}
