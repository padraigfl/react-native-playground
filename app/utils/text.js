export const getPlaceholder = ({ firstName = "", lastName = "", name }) => {
  if (firstName && lastName) {
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }
  if (name) {
    return lastName[0].toUpperCase();
  }
  return null;
};
