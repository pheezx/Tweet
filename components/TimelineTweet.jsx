import styles from "./timelineTweet.module.scss";

const toTimeString = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  // time difference in minutes
  const timeDifference = Math.floor((now - date) / 1000 / 60);
  if (timeDifference < 60) {
    return `${timeDifference}m`;
  } else if (timeDifference < 24 * 60) {
    return `${Math.floor(timeDifference / 60)}h`;
  } else {
    return date.toLocaleString("default", { month: "short", day: "numeric" });
  }
};

export default function TimelineTweet({ createdAt, body }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.profilePhoto}>
          <img
            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.top}>
          <span className={styles.name}>Anonymous Writer</span>
          <span className={styles.at}>@timeline</span>
          <span>·</span>
          <span className={styles.time}>
            {toTimeString(createdAt)}
            {}
          </span>
        </div>
        <div className={styles.message}>{body}</div>
      </div>
    </div>
  );
}
