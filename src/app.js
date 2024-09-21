import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from "./components/modal-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    openShoppingCart: useCallback(() => {
      setIsModalOpen(true);
    },
      [store],
    ),

    onAddCartItem: useCallback(
      code => {
        store.addCartItem(code)
      },
      [store],
    ),

    deleteItemFromCart: useCallback(
      code => {
        store.deleteItemFromCart(code);
      },
      [store],
    )
  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls
        count={basket.count}
        amount={basket.amount}
        openShoppingCart={callbacks.openShoppingCart}
      />
      <List
        list={list}
        functionForItem={callbacks.onAddCartItem}
      />
      <ModalLayout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Cart
          basket={basket}
          onClose={() => setIsModalOpen(false)}
          onDelete={callbacks.deleteItemFromCart}
        />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
