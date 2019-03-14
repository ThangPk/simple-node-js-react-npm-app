let People = peopleJSON => {
  let people = {
    id: peopleJSON.id,
    firstName: peopleJSON.first_name,
    lastName: peopleJSON.last_name,
    email: peopleJSON.email === null ? "" : peopleJSON.email,
    phoneNumber: peopleJSON.phone_number,
    images: peopleJSON.images,
    imageIds: extractImageIds(peopleJSON.images)
  };

  return people;
};

function extractImageIds (images) {
  let imageIds = [];
  images.forEach(image => {
    let idStrings = image.split("/");
    imageIds.push(idStrings[2]);
  });

  return imageIds;
};

export default People;
