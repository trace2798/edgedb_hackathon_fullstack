CREATE MIGRATION m1qestx6mosvir5k6d2vvt7q46aijaf6a4rk66kh2waub2yg3a3oaq
    ONTO m1gnx6twodjqe7bz3qsyonzblwvojwt27haqkc5u7ltgxd3663r3vq
{
  ALTER TYPE default::Issue {
      CREATE PROPERTY duedate: std::datetime;
  };
};
