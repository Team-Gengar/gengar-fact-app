import { NextApiRequest, NextApiResponse } from 'next';

export default function factHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const fact = getFact(req, res, req.query.facts);
    console.log(fact);
    // res.status(200).json('fact');
  }
}

const getFact = (req, res, category) => {
  console.log(category);
  switch (category) {
    case 'cat':
      return getCatFact(req, res);
    case 'dog':
      return getDogFact(req, res);
    case 'gengar':
      return getGengarFact(req, res);
    default:
      return 'Sorry, I do not have a fact for that category';
  }
};

const getCatFact = async (req, res) => {
  const response = await fetch('https://catfact.ninja/fact');
  await response.json().then((fact) => {
    res.status(200).json(fact.fact);
  });
};

const getDogFact = async (req, res) => {
  const response = await fetch('https://dog-api.kinduff.com/api/facts');
  await response.json().then((fact) => {
    res.status(200).json(fact.facts);
  });
};

let count = 0;
const getGengarFact = async (req, res) => {
  const facts = [
    "Geodude is Team Gengar's least favorite Pokemon",
    "Team Gengar can't center a div",
    'beans1',
    'Despite common belief, Team Gengar were once juniors',
  ];
  const nextFact = facts[count];
  count++;
  if (count === facts.length) count = 0;
  res.status(200).json(nextFact);
};
