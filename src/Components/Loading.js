import React from 'react';
import PropTypes from 'prop-types';

import '../styles/loading.css';

/**
 * Whenever we create a component that accepts props, we’ll add a static propTypes property to that component.
 * propTypes will be an object whose keys represent the props the component accepts and whose values represent the data types for those props.
 * During development, if a prop being passed to a component doesn’t match the data type specified in propTypes, a warning will be shown in the console.
 */

const styles = {
  content: {
    fontSize: '25px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '100px',
    textAlign: 'center',
  },
};

export default function Loading({ text = 'Loading', speed = 300 }) {
  const [loadingContent, setContent] = React.useState(text);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setContent((content) =>
        content === `${text}...` ? text : `${content}.`
      );
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed]);

  return <p style={styles.content}>{loadingContent}</p>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

/**
 * Suppose current state is "Fetching" (we are taking text as "Fetching"), then updated states will be Fetching. ,  Fetching.. , Fetching...
 * After "Fetchin...", state will be "Fetching" and then it will continue like Fetching. , Fetching.. , Fetchin... , Fetching and so on until the page gets loaded.
 */

/**   React.useEffect
 
 * Whenever we want to interact with the world outside of React (whether that’s to make a network request, manually update the DOM, mutating non-local variables, etc.), you’d reach for useEffect.
 * Again, by default, on every render (including the initial render), the effect won’t run until after React has updated the DOM and the browser has painted those updates to the view. 
   The reason for this timing is so the side effect doesn’t block updates to the UI.
 *
 * By default, React will re-invoke the effect after every render. So, we quickly get caught in an infinite loop (and just as quickly, get rate limited by the Github API). 
   Our component gets rendered then invokes our effect, which updates our state, which triggers a re-render, which then invokes our effect, which updates our state, which triggers a re-render, and on and on.
   Suppose we are making an API request in our function component.
   For example, say we were given this getGithubProfile function which fetched profile data from the Github API.
   We know that making a network request is a side effect. To manage our side effect, we’ll put it inside of React’s useEffect Hook. 
   To keep things simple for now, we’ll hardcode tylermcginnis as our Github username.
   We quickly get caught in an infinite loop (and just as quickly, get rate limited by the Github API). Our component gets rendered then invokes our effect, which updates our state, which triggers a re-render, which then invokes our effect, which updates our state, which triggers a re-render, and on and on.
   
 * 
 *   Skipping side effects
 *
 * "We only want to invoke the effect once on the initial render, not on every subsequent re-render."
 * To opt out of useEffect's default functionality of being re-invoked on every re-render. useEffect exposes a way to customize this via its second argument.
 * We pass a second argument to useEffect, we need to pass to it an array of all of the outside values your effect depends on. 
 * This typically leads us to one of three scenarios - no second argument, an array of all outside values the effect depends on, or an empty array (assuming our effect doesn’t depend on any values).
 * If our effect isn’t dependant on any outside values. Then we can safely pass an empty array as the second argument so our effect will only be invoked on the initial render.                                            
 

 *   Cleaning up side effects
 * 
 * Let’s imagine we’re dealing with the same Github API as we saw earlier, but this time it’s WebSocket based. 
   Instead of making a single network request to get our data, we set up a listener to be notified whenever the data changes. 
   In this scenario, we can’t just set it and forget it. We need to make sure that we clean up our subscription whenever the component is removed from the DOM or when we no longer want to receive updates from the API. If not, we’ll have a memory leak.
 
   If you return a function from useEffect, React will make sure that function is invoked right before the component is removed from the DOM. 
   Additionally, if your component is re-rendered, the cleanup function for the previous render’s effect will be invoked before re-invoking the new effect.
 
   In this example, there are two scenarios where the cleanup function would be invoked. First, whenever username changes, before the new effect is invoked with the new username. 
   And second, right before Profile is removed from the DOM. 
   In both scenarios, we want to unsubscribe from our API as well as reset profile to null so we get the Loading... UI.
 */
