import {atom, selector} from "recoil"

const basketItemsState = atom({
  key: 'basketItems',
  default: [],
});

export const basketItems = selector({
  key: 'basketItemsQuantity',
  get: ({ get }) => {
    return get(basketItemsState);
  }
});

export default basketItemsState;
