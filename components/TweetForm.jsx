import styles from "./tweetForm.module.scss";
import { useForm } from "react-hook-form";

export default function TweetForm ({ onSubmit }) {
  const { register, handleSubmit } = useForm();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("body", { required: true })}
            placeholder="What's happening?"
          />
          <div className={styles.submitButton}>
            <button>Tweet</button>
          </div>
        </form>
      </div>
    </div>
  );
};
