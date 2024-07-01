const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isContactType(type)) return type;
};

const parseIsFavourite = (favourite) => {
    const isFavourite = favourite == 'true' ? true : false;

    return isFavourite;

};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavourite = parseIsFavourite(isFavourite);


  return {
    contactType: parsedType,
    isFavourite: parsedFavourite
  };
};