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

export const parseRoomName = (room: string) => {
  const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const indexNumber = room
    .split("")
    .findIndex((number) => numberArray.includes(number));
  if (indexNumber !== -1) {
    const cleanRoom = room.slice(0, indexNumber) + room.slice(indexNumber + 1);
    return `${cleanRoom} ${room.slice(indexNumber)}`;
  }
  return room;
};
