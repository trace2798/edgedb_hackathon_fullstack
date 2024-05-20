CREATE MIGRATION m1x2jers2xwhggile5cg34crz4a7mh3hug4o75xjutez72leoebpda
    ONTO m1o5s3gsggvkwwmfd3h3bdd7ci3wckpe5eqn6byosn7lognqpbeckq
{
  ALTER TYPE default::List {
      ALTER PROPERTY name {
          RENAME TO title;
      };
  };
};
