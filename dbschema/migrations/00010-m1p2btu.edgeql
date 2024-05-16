CREATE MIGRATION m1p2btureghv3xeo2vohttgcbvgjd5snm4ztf7mjtsrbo6b4glzvsa
    ONTO m1gyyakobw2gplhdvpfz2pwf3kdyjr7su626z5j7sfxjlnapxrjq7q
{
  ALTER TYPE default::Issue {
      DROP PROPERTY urls;
  };
};
