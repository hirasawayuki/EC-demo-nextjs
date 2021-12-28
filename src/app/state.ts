import {atom, selector} from "recoil"

const basketItemsState = atom({
  key: 'basketItemsState',
  default: [],
});

export const basketItems = selector({
  key: 'basketItems',
  get: ({ get }) => {
    return get(basketItemsState);
  }
});

export const basketItemsTotal = selector({
  key: 'basketItemsTotal',
  get: ({ get }) => {
    const items = get(basketItemsState);
    return items.reduce((sum, item) => sum + item.price, 0);
  }
});

export default basketItemsState;
