import {atom, selector} from "recoil"

const basketItemsState = atom({
  key: 'basketItems',
  default: [],
})

export const basketItemsQuantity = selector({
  key: 'basketItemsQuantity',
  get: ({ get }) => {
    const basketItems = get(basketItemsState);
    return basketItems.length;
  }
})

export default basketItemsState;
