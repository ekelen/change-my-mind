import Image from "next/image";
import styles from "../../styles/Home.module.css";

export const MAX_STEPS = 13;

export const Step__0 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        Breaking news!
      </div>
    </>
  );
};
export const Step__1 = () => {
  return (
    <>
      <ImageWrapper>
        <Bear />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        A bear has been discovered!
      </div>
    </>
  );
};

export const Step__2 = () => {
  return (
    <>
      <ImageWrapper>
        <Skull />
        <Skull />
        <Skull />
        <Bear />
        <Skull />
        <Skull />
        <Skull />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        A bear who likes eating humans!{" "}
      </div>
    </>
  );
};
export const Step__3 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        Scientists say the bear looks malnourished, and that he&rsquo;s likely
        not very good at it.
      </div>
    </>
  );
};

export const Step__4 = () => {
  return (
    <>
      <ImageWrapper>
        <Image
          src="/noun-bear_sit_nofill.svg"
          height={200 * 0.8}
          width={200}
          alt="bear eating"
          color="white"
        />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        This time of year, bears need to rapidly gain weight to survive the
        winter.
      </div>
    </>
  );
};

export const Step__5 = () => {
  return (
    <>
      <ImageWrapper>
        <Image
          src="/noun-acorns-3351893.svg"
          height={200 * 0.8}
          width={200}
          alt="squirrel"
        />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        His best bet for survival is to FORAGE for nuts, tubers, berries, and
        bark.
      </div>
    </>
  );
};

export const Step__6 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
        <GunBro />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        THE SOLUTION IS OBVIOUS!
      </div>
    </>
  );
};

export const Step__7 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        Unless, of course, you—
      </div>
    </>
  );
};

export const Step__8 = () => {
  return (
    <>
      <ImageWrapper>
        <You />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        —yes, YOU—
      </div>
    </>
  );
};

export const Step__9 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        can convince the bear to change its diet and stop eating humans!
      </div>
    </>
  );
};

export const Step__10 = () => {
  return (
    <>
      <ImageWrapper>
        <NewsMan />
      </ImageWrapper>
      <div className={`${styles.stepText} ${styles.newsManText}`}>
        Authorities advise against negotiating with the bear, unless, say, you
        have training in helping people make a change they are ambivalent about.
      </div>
    </>
  );
};

export const Step__11 = () => {
  return (
    <>
      <ImageWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <GunBro />
          <GunBro />
          <NewsMan />
          <GunBro />
          <GunBro />
        </div>
      </ImageWrapper>

      <div className={`${styles.stepText} ${styles.newsManText}`}>
        But if not, we have plenty of these folks on standby.
      </div>
    </>
  );
};

export const Step__12 = () => {
  return (
    <>
      <ImageWrapper>
        <You />
      </ImageWrapper>
      <div className={styles.stepText}>Darnit...</div>
    </>
  );
};

export const Step__13 = () => {
  return (
    <>
      <ImageWrapper>
        <Image
          src="/noun-man-hiking.svg"
          height={170}
          width={200}
          alt="hiker"
        />
      </ImageWrapper>
      <div className={styles.stepText}>...Guess I better give it a try.</div>
    </>
  );
};

const ImageWrapper = ({ children }) => {
  return <div className={styles.stepImages}>{children}</div>;
};

const NewsMan = ({ width = 200 }) => {
  return (
    <Image
      src="/noun-tv-news.svg"
      alt="breaking news"
      height={width * 0.8}
      width={width}
    />
  );
};

const GunBro = ({ width = 200 }) => {
  return (
    <Image
      src="/noun-man-gun.svg"
      alt="gun bro"
      height={width * 0.8}
      width={width}
    />
  );
};

const Skull = () => {
  return (
    <Image
      src="/noun-skull-face-confused.svg"
      height={30}
      width={30}
      alt="skull"
    />
  );
};

const You = ({ height = 200, width = 200 }) => {
  return (
    <Image
      src="/noun-hiking.svg"
      alt="you, the hiker"
      height={height}
      width={width}
    />
  );
};

const Bear = ({ width = 200 }) => {
  return (
    <Image
      src="/noun-bear.svg"
      alt="a scary bear"
      height={width * 0.8}
      width={width}
    />
  );
};

export const IntroStep = ({ step }) => {
  switch (step) {
    case 0:
      return <Step__0 />;
    case 1:
      return <Step__1 />;
    case 2:
      return <Step__2 />;
    case 3:
      return <Step__3 />;
    case 4:
      return <Step__4 />;
    case 5:
      return <Step__5 />;
    case 6:
      return <Step__6 />;
    case 7:
      return <Step__7 />;
    case 8:
      return <Step__8 />;
    case 9:
      return <Step__9 />;
    case 10:
      return <Step__10 />;
    case 11:
      return <Step__11 />;
    case 12:
      return <Step__12 />;
    case 13:
      return <Step__13 />;
    default:
      return <Step__0 />;
  }
};
