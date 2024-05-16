CREATE MIGRATION m1v5qnq2zqdzf2f3exyp4swqz33xiypqbb2eqp47ygsl3epjnl4luq
    ONTO m1nbu656qhjxbpo3isqhbo2fymsdtsbz7x3536hd2mgkftlsd5l3oq
{
  ALTER TYPE default::Issue {
      CREATE PROPERTY assigneeId: std::uuid;
  };
};
