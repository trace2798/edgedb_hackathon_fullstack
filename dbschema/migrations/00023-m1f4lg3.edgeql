CREATE MIGRATION m1f4lg3xtufzlityz32znxbsx3kjlmq4rdw5ppsmejgxfnw6ihkioa
    ONTO m1dac5zrbbamyu7vremxiceot2wdexx7iqlg2ytsij7votvzy37ava
{
  ALTER TYPE default::Card {
      DROP LINK cardattachments;
  };
  DROP TYPE default::CardAttachment;
};
