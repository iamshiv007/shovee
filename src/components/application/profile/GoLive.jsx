import Link from "next/link";

export const GoLive = () => {
  return (
    <>
      <div className={styles.container}>
        <p>Create Your Portfolio&apos;s home Page to Go Live !</p>
        <Link className={styles.startBtn} href='/portfolio/form/home'>
          Start
        </Link>
      </div>
    </>
  );
};

const styles = {
  container: "flex flex-col gap-3 items-center",
  startBtn:
    "text-white font-semibold py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded",
};
