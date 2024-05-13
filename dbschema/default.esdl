module default {
  scalar type MemberRole extending enum<admin, member, owner>;
    type User {
         name: str;
        required email -> str {
            constraint exclusive;
        }
         emailVerified: datetime {
      rewrite insert using (datetime_of_statement());
    }
         image: str;
        multi accounts := .<user[is Account];
        multi sessions := .<user[is Session];
        multi workspaces := .<user[is Workspace];
        multi workspacesMember := .<user[is WorkspaceMember];
        multi activity := .<user[is Activity];
       createdAt: datetime {
      rewrite insert using (datetime_of_statement());
    }
    }
 
  type Account {
    required userId := .user.id;
    required type: str;
    required provider: str;
    required providerAccountId: str {
      constraint exclusive;
    }
    refresh_token: str;
    access_token: str;
    expires_at: int64;
    token_type: str;
    scope: str;
    id_token: str;
    session_state: str;
    required user: User {
      on target delete delete source;
    }
    createdAt: datetime {
      rewrite insert using (datetime_of_statement());
    }

    constraint exclusive on ((.provider, .providerAccountId));
  }
 
 type Session {
    required sessionToken: str {
      constraint exclusive;
    }
    required userId := .user.id;
    required expires: datetime {
      rewrite insert using (datetime_of_statement());
    };
    required user: User {
      on target delete delete source;
    }
    createdAt: datetime {
      rewrite insert using (datetime_of_statement());
    }
  }
 
type VerificationToken {
    required identifier: str;
    required token: str {
      constraint exclusive;
    }
    required expires: datetime {
      rewrite insert using (datetime_of_statement());
    }
    createdAt: datetime {
      rewrite insert using (datetime_of_statement());
    }

    constraint exclusive on ((.identifier, .token));
  }

type Workspace {
   required name: str;
   description: str;
   required userId := .user.id;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
     required link user -> User {
            on target delete delete source;
       };
      multi workspaceMember := .<workspace[is WorkspaceMember];
      multi activity := .<workspace[is Activity];
}

type WorkspaceMember {
  name: str;
  required email: str;
  required userId := .user.id;
  required workspaceId := .workspace.id;
  created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
    memberRole: MemberRole {
      default := "member";
    };
     required link user -> User {
      on target delete delete source;
    }
    required link workspace -> Workspace {
      on target delete delete source;
    }

}

type Activity {
  message: str;
  required userId := .user.id;
  required workspaceId := .workspace.id;
  created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
    required link workspace -> Workspace {
      on target delete delete source;
    }
      required user: User
}

}
 
# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
using future nonrecursive_access_policies;