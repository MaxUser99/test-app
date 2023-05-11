import { QueryFunction } from 'react-query';
import { IPosition } from '../types/IPositions';

export const fetchPositions: QueryFunction<IPosition[]> = () => {
  return fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
  )
    .then((res) => res.json())
    .then((res) => res.positions as IPosition[]);
};
