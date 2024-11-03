const postCharacterData = (body: {
  name: string;
  level: number;
  xp: number;
  strength: number;
  speed: number;
  magic: number;
  dexterity: number;
  healthPoints: number;
  manaPoints: number;
  luck: number;
  defense: number;
  magicDefense: number;
  progress: string;
}) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/character/create", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const CharacterService = {
  postCharacterData,
};

export default CharacterService;
