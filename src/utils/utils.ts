export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

export const formatEmail = (email: string) => {
  return email.split("@")[0];
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("es-CO");
};
