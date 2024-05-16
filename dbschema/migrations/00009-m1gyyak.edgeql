CREATE MIGRATION m1gyyakobw2gplhdvpfz2pwf3kdyjr7su626z5j7sfxjlnapxrjq7q
    ONTO m1gzpqjx52bbugfiae7mddya6p6ykvlmtttwokilmbm45znmlrxkrq
{
  ALTER TYPE default::Issue {
      CREATE PROPERTY urls: array<tuple<url: std::str, description: std::str>>;
  };
  ALTER TYPE default::Issue {
      DROP PROPERTY link;
  };
  ALTER TYPE default::Issue {
      DROP PROPERTY link_description;
  };
};
