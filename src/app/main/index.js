import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Basket from '../basket';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Navbar from "../../components/navbar";

function Main() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    store.actions.catalog.load();
    store.setLang(store.state.lang);
  }, [store.state.lang]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count : state.catalog.count,
    currentPage : state.catalog.currentPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы магазина
    setNumberPage: useCallback((page) => store.actions.catalog.setNumberPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={'/article/'}  onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Navbar />
      <BasketTool onOpen={callbacks.openModalBasket}
                  amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage}
                  totalCount={select.count}
                  pageSize={10}
                  setNumberPage={page => callbacks.setNumberPage(page)}/>
    </PageLayout>
    {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Main);
