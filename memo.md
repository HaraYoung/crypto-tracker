## Router V6을 활용


- createBrowserRouter 사용
  - errorElement 사용
    ```javascript
    //Router.tsx

    import { createBrowserRouter } from 'react-router-dom';

    import App from './App.tsx';
    import Home from './Home.tsx';
    import About from './About.tsx';

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App/>
            children: [
                {
                    path: '',
                    element: <home/>,
                },
                {
                    path: 'about',
                    element: <About/>,
                },
            ],
            errorElement : <NoutFound/>
        },
    ])
    export default router;
    ```


- RouterProvider 사용

    ```javascript
        //index.tsx
        ...
        import {RouterProvider} from 'react-router-dom';
        import router from './Router.tsx';

        root.render(
            <React.StricMode>
                <RouterProvider router = {router} />
            </React.StricMode>
        );
    ```

- Outlet 사용

```javascript
//App.tsx
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<>
			<Outlet />
		</>
	);
}
export default App;
```


- Themes사용
  1. `index.js` 에 패키지 참조

```jsx
import {ThemeProvider } from 'styled-components';
```

  2. 객체 생성
  3. 사용
   `color : ${(props) => props.theme.textColor};`