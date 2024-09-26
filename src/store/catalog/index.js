import {LangSwitcher, codeGenerator} from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1
    }
  }

  async load() {
    const currentPage = this.getState().currentPage;
    const response = await fetch(`/api/v1/articles?limit=10&skip=${currentPage * 10 - 10}&fields=items(_id, _key, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }

  async setNumberPage(page) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10 - 10}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: page,
    }, `Загружены товары с ${page} страницы`)
  }
}

export default Catalog;
