import {collection, doc, setDoc} from 'firebase/firestore';

// const citiesRef = collection(db, 'cities');
// export async function test(): Promise<void> {
//   await setDoc(doc(citiesRef, 'SF'), {
//     name: 'San Francisco',
//     state: 'CA',
//     country: 'USA',
//     capital: false,
//     population: 860000,
//     regions: ['west_coast', 'norcal'],
//   });
//   await setDoc(doc(citiesRef, 'LA'), {
//     name: 'Los Angeles',
//     state: 'CA',
//     country: 'USA',
//     capital: false,
//     population: 3900000,
//     regions: ['west_coast', 'socal'],
//   });
//   await setDoc(doc(citiesRef, 'DC'), {
//     name: 'Washington, D.C.',
//     state: null,
//     country: 'USA',
//     capital: true,
//     population: 680000,
//     regions: ['east_coast'],
//   });
// }
