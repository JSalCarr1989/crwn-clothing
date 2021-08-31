import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  yield console.log("I am Fire");

  try {
    const collectionRef = firestore.collection("collections");

    const snapshot = yield collectionRef.get(); //<--- el valor regresa en forma de una promesa pero con yield se convierte al valor y se pone en la constante

    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    ); //<--- el primer valor sera la funcion que queremos llamar, los subsecuentes los parametros que reciba.
    yield put(fetchCollectionsSuccess(collectionsMap)); // con esto hacemos "dispatch" a las acciones
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  //    dispatch(fetchCollectionsStart());

  //    collectionRef
  //      .get()
  //      .then((snapshot) => {
  //        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     //    dispatch(fetchCollectionsSuccess(collectionsMap));
  //      })
  //      .catch((error) => {
  //     //    dispatch(fetchCollectionsFailure(error.message));
  //      });
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
