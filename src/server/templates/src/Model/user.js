let User = userJSON => {
  let user = {
    id: userJSON.id,
    userName: userJSON.user_name,
    role: userJSON.is_admin ? "Admin" : "Normal",
    email: userJSON.email === null ? "" : userJSON.email,
    firstName: userJSON.first_name,
    lastName: userJSON.last_name,
    fullName: userJSON.first_name + " " + userJSON.last_name,
    phoneNumber: userJSON.phone_number,
    isAdmin: userJSON.is_admin,
    groups: [],
    groupsString: ""
  };

  return user;
};

export default User;
