import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }


  /**
   * Добавить элемент в корзину
   * @param code
   */
  addCartItem(code) {
    const itemToBasket = this.state.basket.list.find((item) => item.code === code);
    if (itemToBasket) {
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          list: this.state.basket.list.map(item =>
            item.code === code ? { ...item, count: item.count + 1 } : item
          ),
          amount: this.state.basket.amount + itemToBasket.price,
        }
      });
    } else {
      const itemToAdd = this.state.list.find((item) => item.code === code);
      this.setState({
        ...this.state,
        basket: {
          list: [...this.state.basket.list,
            { code: itemToAdd.code, title: itemToAdd.title, price: itemToAdd.price, count: 1 },
          ],
          count: this.state.basket.count + 1,
          amount: this.state.basket.amount + itemToAdd.price,
        }
      });
    }
  }


  /**
   * Удаление элемента из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const itemToBasket = this.state.basket.list.find((item) => item.code === code);
    this.setState({
      ...this.state,
      basket:{
        list: this.state.basket.list.filter(item => item.code !== code),
        count: this.state.basket.count - 1,
        amount: this.state.basket.amount - (itemToBasket.price * itemToBasket.count),
      }
    });
  }
}

export default Store;
