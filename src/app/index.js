import Main from './main';
import Article from './article';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route exact path="/" element={<Main />} />
          <Route exact path='article/:id' element={<Article />} />
        </>
    )
  )

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
