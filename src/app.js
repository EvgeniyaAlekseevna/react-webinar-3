import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";

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
      <Modal
        basket={basket}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={callbacks.deleteItemFromCart}
      />
      <List
        list={list}
        onAddCartItem={callbacks.onAddCartItem}
      />

    </PageLayout>
  );
}

export default App;
