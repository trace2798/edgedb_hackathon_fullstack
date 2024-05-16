CREATE MIGRATION m1nbu656qhjxbpo3isqhbo2fymsdtsbz7x3536hd2mgkftlsd5l3oq
    ONTO m1p2btureghv3xeo2vohttgcbvgjd5snm4ztf7mjtsrbo6b4glzvsa
{
  ALTER TYPE default::Issue {
      CREATE PROPERTY urls: array<std::str>;
  };
};
