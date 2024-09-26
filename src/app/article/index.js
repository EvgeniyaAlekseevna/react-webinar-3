import { memo, useCallback, useEffect} from "react";
import Navbar from "../../components/navbar";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import ArticleItem from "../../components/article-item";
import Basket from "../basket";
import { useParams } from "react-router-dom";

function Article() {
  const store = useStore();
  const { id } = useParams();
  const activeModal = useSelector(state => state.modals.name);


  useEffect(() => {
    store.actions.article.load(id);
    store.setLang(store.state.lang);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
  }))

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.article.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  if (select.item === null) {
    return <>Загрузка...</>
  }

  return (
    <>
      <PageLayout>
        <Head title={select.item.title}/>
        <Navbar />
        <BasketTool onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}/>
        <ArticleItem onAdd={callbacks.addToBasket}
                     item={select.item}/>
      </PageLayout>
      {activeModal === 'basket' && <Basket/>}
    </>
  )
}

export default memo(Article);