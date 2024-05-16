CREATE MIGRATION m1gzpqjx52bbugfiae7mddya6p6ykvlmtttwokilmbm45znmlrxkrq
    ONTO m1qestx6mosvir5k6d2vvt7q46aijaf6a4rk66kh2waub2yg3a3oaq
{
  ALTER TYPE default::Issue {
      CREATE PROPERTY link: std::str;
      CREATE PROPERTY link_description: std::str;
  };
};
