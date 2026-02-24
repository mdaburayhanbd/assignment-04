1. getElementById : Selects one single element using unique id
   getElementsByClassName : Selects all elements with same class name 
   querySelector : Selects the first element that matches any CSS selector 
   querySelectorAll : Selects all elements that match any CSS selector

2. I can  create a new element using document.createElement() and insert it into the DOM using methods like appendChild() or append()

3. When an event gets started on the target element, it automatically bubbles up to its parent elements in the DOM. This process is known as event bubbling.
   How it works:
When  click a button inside a div, the click event starts on the button, then moves to the div, then to the body, and finally to the top of the document.

4. Adding a single event listener to a parent element rather than individual listeners to each child element is known as event delegation.
  It improves performance, reduces code, and also works for dynamically added elements because events bubble up to the parent.

5. preventDefault() : controls the browser's default response to an event (such as blocking the opening of a link).
   stopPropagation() : Stops the event from bubbling or capturing to parent/ancestor elements.