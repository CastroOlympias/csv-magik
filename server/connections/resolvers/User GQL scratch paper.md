<!-- *** Mutations *** -->
<!-- Create a user -->
mutation CreateAUser(
  $userName: String
  $eMail: String
  $birthDate: String
  $password: String
) {
  createAUser(
    userName: $userName
    eMail: $eMail
    birthDate: $birthDate
    password: $password
  ) {
    token
    user {
      createdAt
      _id
      userName
      eMail
      password
    }
  }
}


<!-- Login to user -->
mutation LoginToAUser($eMail: String, $password: String) {
  loginToAUser(eMail: $eMail, password: $password) {
    token
    user {
      createdAt
      _id
      userName
      eMail
      birthDate
    }
  }
}

<!-- HTTP Headers token to perform action against logged in user data -->
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiTWF0dCIsImVNYWlsIjoibWF0dEBtYXR0LmNvbSIsIl9pZCI6IjYxOGMzNGQ1NzliYzAwMmJiODA1MTJmMyJ9LCJpYXQiOjE2MzY2MDAyNjQsImV4cCI6MTYzNjYwNzQ2NH0.oGK_lTyfMRESkrJJd66OxqsocYnDzwgk-wcKdfQZZyo"
}

<!-- Update logged in user -->
mutation EditAUser(
  $userName: String
  $eMail: String
  $birthDate: String
  $password: String
  $aboutMe: String
  $findMeFriend: String
) {
  editAUser(
    userName: $userName
    eMail: $eMail
    birthDate: $birthDate
    password: $password
    aboutMe: $aboutMe
    findMeFriend: $findMeFriend
  ) {
    createdAt
    _id
    userName
    eMail
    birthDate
    password
    aboutMe
    findMeFriend
  }
}

<!-- Delete user, you don't have to be loggen in via user token to delete user -->
mutation DeleteAUser($userId: ID) {
  deleteAUser(userId: $userId) {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
  }
}


<!-- *** Queries *** -->
<!-- Query me -->
query FindMe {
  findMe {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
    findMeFriend
    userPantry {
      pantryUserId
      pantryUserName
      createdAt
      _id
      pantryType
      pantryNotes
    }
    userMeals {
      mealUserId
      mealUserName
      createdAt
      _id
      mealName
      mealQuantity
    }
    userComments {
      commentUserId
      commentUserName
      createdAt
      _id
      commentText
    }
  }
}

<!-- Query all users -->
query FindAllUsers {
  findAllUsers {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
    findMeFriend
    userPantry {
      pantryUserId
      pantryUserName
      createdAt
      _id
      pantryType
      pantryNotes
    }
    userMeals {
      mealUserId
      mealUserName
      createdAt
      _id
      mealName
      mealQuantity
    }
    userComments {
      commentUserId
      commentUserName
      createdAt
      _id
      commentText
    }
  }
}

<!-- Query all users same by name -->
query findAllUsersBySameName($userName: String) {
  findAllUsersBySameName(userName: $userName) {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
    findMeFriend
  }
}

<!-- Query user by _id -->
query findAUserById($userId: ID) {
  findAUserById(userId: $userId) {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
    findMeFriend
  }
}

<!-- Query user by email address -->
query findAUserByEmail($eMail: String) {
  findAUserByEmail(eMail: $eMail) {
    createdAt
    _id
    userName
    eMail
    birthDate
    aboutMe
    findMeFriend
  }
}