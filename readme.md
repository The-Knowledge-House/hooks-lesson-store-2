# React State and React Hooks

## Lesson Objectives

* Discuss the need for `state` in front-end applications
* Manipulate state within a React application
* Differentiate between state and props
* Discuss the need to share `state` across different parts of the application
* Share state across multiple React components
* Use React Hooks to manage state and set up default values

## What is "State"? 

As we have seen in our exploration so far, most of our job as web developers centers around displaying, storing, and manipulating `data`. This data is rarely "static", and nearly every action a user takes modifies some or all of the `data`. Because of this, the "shape" of our data is constantly changing as our application runs. Another word for the "shape" of our data at a given point in time is `state`.

Until now, we have stored "state" for HTML in global JS variables. We've used `JavaScript` to set and retrieve these values as we react to user input. This has worked out fine, but it requires quite a bit of work on our part. On top of that, the responsibility for handling our state has been shared between our HTML and Javascript files.

React gives us a much simpler way to manage this state, and it allows us to keep all of it inside of our Javascript alone.

### Props Are Owned by a Parent Component, State is Owned by the App Component

* When we refer to props, we're referring to the JSX "attributes" (properties) that have been passed down from a parent component.
  `<Movie title={"Blade Runner 2049"} year={2017} />`
* State is declared within the component.

```javascript
...
import React, {useState} from "react";

function Movie() {
const [movie, setMovie] = useState('Blade Runner')
const [year, setYear] = useState('1982')

return(
  <div></div>
)
}
```
### useState Hook
* The hook let's us allocate initial state (e.g. an empty string) and returns an array which has the state and a function to set the state. By using JavaScript Array Destructuring, we can conveniently extract the returned values from the hook in one line of code

### Props Are Immutable, State is Not

* It is impossible to directly change a components `prop` values. Props are `read-only` values
* State is able to be mutated via `setYear` or `setMovie` respectively

### State can be passed down into another component's props, but not vice-versa

* We will often pass parts of a component's state down to child components.  The child gains the value in its own `props`
* Child components cannot pass state up to a parent.  (Remember Unidirectional Data Flow)

## Managing State (CodeAlong)

### Let's build a hardware store!

We'll need a "view" for our store, to display our product.

Let's create the initial structure for our app:

* Inside of your class exercise directory, use the `create-react-app` tool to create a new `hooks-lesson-store` application:

```bash
$ create-react-app hooks-lesson-store
```

* `cd` into our new `hooks-lesson-store` directory and start the new application with `npm start`:

```bash
$ cd hooks-lesson-store
$ npm start

```

* We should now see a default React application loaded in our browser!

### Creating the Home Page Component

* Now that we've set up our basic React application, let's start adding in custom components! First, we'll create a `components` directory and a new `<HomePage />` component:

```bash
  $ mkdir src/components
  $ touch src/components/HomePage.jsx
```

* ...and then we'll create a fresh, new `HomePage.jsx` component in our `src/components/` file:

```javascript
// src/components/HomePage.jsx

const HomePage = (props) => {
  return (
    <div>Home Page</div>
  );
};

export default HomePage;
```

* ...and display it in our `App/index.jsx`:

```javascript
  // src/app.js

  import HomePage from './components/HomePage';

  function App() {
        return (
        <div>
          <HomePage />
        </div>
      );
    
  }

  export default App;
```
* Let's add a little more detail to start making things a little more useful. We'll start by giving our store a name and announcing which product is currently on sale:

```javascript
// src/components/HomePage.jsx


import React from 'react';

const HomePage = () => (
  <div>
    <h1>My Hardware Store</h1>
    <div>Currently On Sale: A Drill!</div>
  </div>
);

    
export default HomePage;
    
```

* When we refresh, we'll see the new home page for our store! We're starting to make some progress, but what happens now when we want to quickly update the name of the item that's on sale? We don't want to have to edit our HTML every time a new item goes on sale... We should probably store it in a variable, so we can quickly change it for later. This variable will be the first item we store in our component's `state`.

```javascript
// src/app.js

import HomePage from './components/HomePage';

  function App() {

   const [itemCurrentlyOnSale, setItemCurrentlyOnSale] = useState('A Hammer');

        return (
        <div>
          <HomePage saleItem={itemCurrentlyOnSale} />
        </div>
      );
    
  }

  export default App;
  ```


 * If we look inside of this function, we have defined a variable on `useState` called `itemCurrentlyOnSale`. Now that we have this variable, we can replace our hard-coded string in the `return` function with a reference to this variable, just like any other variable:

```javascript
// src/components/HomePage.jsx


import React from 'react';

const HomePage = (props) => {
    return (
        <div>
          <h1>My Hardware Store</h1>
          <div>Currently On Sale: { props.saleItem }</div>
        </div>
    );
};

export default HomePage;
    
``` 

* When we refresh, we should see that our page looks exactly the same, but now our application is much more dynamic.

* If we open up our component now in Chrome's `React Dev Tools` tab, we should see some "State" with our value of `itemCurrentlyOnSale` available to us. If we edit the value of this property, it will be automatically updated in our browser!

### Modifying State with Buttons 

Now that we've created a variable to hold our sale item, we'll want to give our Admin users a quick way of updating it. We'll ultimately need to build a text-input to edit this value, but let's make our page extra-fancy by `toggling` this text-input on and off using a button.

* First, we'll add the button and input field to our page:

```javascript
    // src/components/HomePage.jsx


    import React from 'react';

    const HomePage = (props) => {
        return (
            <div>
            <h1>My Hardware Store</h1>
            <div>
              <span>Currently On Sale: { props.saleItem }!</span>
              <span><button>Edit Sale Item</button></span>
              <div>
                <input type="text"/>
              </div>
            </div>
          </div>
        );
    };
    
    export default HomePage;

```
* Since we want to toggle a text-input, we'll need some kind of `boolean` variable on our state to store this information. Let's create one in our `constructor` called `editable`, with a value of `true`:

```javascript
  ...
 const [editable, setEditable] = useState(true);
  ...
```
* Now that we have a `flag` set up on the state of our component, deciding when to display our input field is as simple as using a Javascript `if-statement` or `ternary` inside of our `return` statement. Let's hide our text-input when `editable` is true:

```js

   // src/app.js

import HomePage from './components/HomePage';

  function App() {

   const [itemCurrentlyOnSale, setItemCurrentlyOnSale] = useState('A Hammer');
   const [editable, setEditable] = useState(true);

        return (
        <div>
          <HomePage 
          saleItem={itemCurrentlyOnSale}
          editable={editable}
           />
        </div>
      );
    
  }

  export default App;
  ```

```javascript
  // src/components/HomePage.jsx


    import React from 'react';

    const HomePage = (props) => {
        return (
            <div>
            <h1>My Hardware Store</h1>
            <div>
              <span>Currently On Sale: { props.saleItem }!</span>
              <span><button>Edit Sale Item</button></span>

              { props.editable ? <div><input type="text"/></div> : null }

            </div>
          </div>
        );
    };
    
    export default HomePage;
```

* If we open our `React Dev Tools` in Chrome, we can now toggle the value of `editable` and see our input go in and out of the page! This is pretty neat, but it will be even cooler once we've hooked it up to a button.

Let's start by building a function to handle this behavior. Since we'll be toggling the value of `editable` each time the button is clicked, we'll create a function called `toggleEditSaleItem()` on our functional component. Each time the function runs it will flip the value of `editable`. Here's an example:

```javascript
  // src/app.js 
  ...
   const toggleEditSaleItem = event => setEditable(!editable)
  ...
```

* Not quite what we expected to see? There's a little bit more going on here than we previously described. Let's explore what this function is doing:

  * First, we are creating a new variable that is a copy of our `state` value. In the same line of code, we are flipping this value, so that our new variable contains the opposite of our current state value.

  In other words, we are flipping our "toggle" and storing the value as a new variable, while using the same variable name as the property on our `state`.

  * Once we have obtained the new value for our `editable`, we use  `setEditable` to update the value. While we could have simply done something like this instead...

  ```javascript
  ...
  editable = !editable
  ...
```

The use of `setVariable` with `useState` is a best practice and will allow us to avoid many common pitfalls that come from updating our component's state directly.

* Just like our vanilla javascript days, we'll need to add some kind of `event listener` to our toggle button so it will run our function. Fortunately, React has several pre-built `events` that will handle all of this functionality for us. We simply need to build a function, and tell the button to trigger the function `onClick()`:

```javascript
  <button onClick={props.toggleEditSaleItem}>
    Edit Sale Item
  </button>
```

We will also need to pass down the `toggleEditSaleItem` method from `App` to `HomePage` just like we did with state.

```javascript
  ...
  <HomePage 
    saleItem={itemCurrentlyOnSale} 
    editable={editable}
    toggleEditSaleItem={toggleEditSaleItem}
  />
  ...
```
* Let's try it out! When the page refreshes, we can now toggle our input in and out of the page with the click of a button.

### Updating the Button Value based on State 

Now that we are toggling our input field in and out of the page, we probably want to change the button text to reflect our state as well. Pair up and add the following functionality:

* When `editable` is false, our button should say "Edit Sale Item"
* When `editable` is true, our button should say "Hide"

<details>
  <summary><b>SOLUTION</b></summary>

```javascript

  // src/app.js

import React, { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  const [itemCurrentlyOnSale, setItemCurrentlyOnSale] = useState('A Hammer');
  const [editable, setEditable] = useState(true);


  //update editable and toggle it true or false 
  const toggleEditSaleItem = event => setEditable(!editable)

  return (
    <div>
      <HomePage
        saleItem={itemCurrentlyOnSale}
        editable={editable}
        toggleEditSaleItem={toggleEditSaleItem}
      />
    </div>
  );
}

export default App;
```

</details>
---

## Modifying State with Forms 

Now that we are able to toggle our text-input on and off, it's time to update our sale item value.

* The first thing we'll want to do is pre-populate our form with the current value. We can use the standard HTML `value=""` tag to accomplish this. Let's drop the current value of `props.itemCurrentlyOnSale` into our input's `value`:

```javascript
  // src/components/HomePage.jsx
  
    import React from 'react';

    const HomePage = (props) => {
        return (
            <div>
            <h1>My Hardware Store</h1>
            <div>
              <span>Currently On Sale: { props.saleItem }!</span>
              <span>
                <button onClick={props.toggleEditSaleItem}>
                  { props.editable ? 'Hide' : 'Edit Sale Item' }
                </button>
              </span>

              { props.editable ? <div>
                <input
                  type="text"
                  value={props.itemCurrentlyOnSale}
                />
              </div> : null }

            </div>
          </div>
        );
    };
    
    export default HomePage;
```

* When we refresh, we should see that the our form input is pre-populated with the sale item from our `state`, but there's a problem!

Our input field is now disabled. When we try to change our text value, nothing happens. This is because we have not told React how to react to any changes in this data. In order for us to update our state, we must turn our input into a `controlled input`. We will do this by giving React a function to run any time the input changes.

* First, let's create the function that we want to run. Every time the input text changes, we want the corresponding value on our `state` to update as well, so we'll create something like this:

```javascript
  // src/app.js
  
  ...
  const handleItemCurrentlyOnSaleChange = (event) => {
    const itemCurrentlyOnSale = event.target.value
    setItemCurrentlyOnSale(itemCurrentlyOnSale)
  }
  ...
```

We will also need to pass this down to our `HomePage` component.

```javascript
  ...
  <HomePage 
    saleItem={itemCurrentlyOnSale} 
    editable={editable}
    toggleEditSaleItem={toggleEditSaleItem}
    handleItemCurrentlyOnSaleChange={handleItemCurrentlyOnSaleChange}
  />
  ...
```

* Then, we'll tell the form to run our function every time the input changes, using React's built-in `onChange` event:

```javascript
// src/components/HomePage.jsx
  ...
  {
    props.editable ?
      <div>
        <input 
          onChange={props.handleItemCurrentlyOnSaleChange}
          value={props.itemCurrentlyOnSale} 
          type="text"
        />
      </div>
      : null
  }
  ...
```

* If we look closely at our function, we should see some very familiar code. To change our state in React, we simply use a plain old Javascript event. This event contains the current value our form input. The event is fired automatically by React every time the input changes. 

Because we are using this new value to update the state every time the input changes, we should be able to see the displayed sale item update in real-time, as we type it! Let's check it out in the browser.

## Unidirectional Data Flow

We have successfully modified the state of a single component in two different ways now: with a button and a form. This is fairly simple when all of our state is used within a single component, but what happens when we want to share this data between multiple components?

While there are many different strategies out there for sharing state, React emphasizes a `unidirectional data flow`. This `unidirectional data flow` means that data should only flow downwards to child components, never upwards. It also means that we should never end up with multiple copies of the same data that could become out of sync. In the simplest terms, this means we should store our state as high up in our `tree` of components as possible.

## Summary
- `useState` is a React hook for `state`
- `state` is where we store our data for our app
- `props` is any data or methods that have been passed down from a parent component
- `state` can only be changed with `useState`
- `props` cannot be changed
- Data is always passed down. never up.