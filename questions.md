#### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
Compared to Component, PureComponent is one that has no side effects. For example, if I asynchronously fetch data in a component and don't use the useEffect hook.

#### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
If not implemented correctly, it can lead to unexpected behavior, such as components not updating when they are supposed.

#### 3. Describe 3 ways to pass information from a component to its PARENT.
Props, context, callback function

#### 4. Give 2 ways to prevent components from re-rendering.
useMemo, useCallback

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.
We use fragment if we want to render more JSX elemtents <></>.

#### 6. Give 3 examples of the HOC pattern.
I am unable to answer this question without using the internet.

#### 7. What's the difference in handling exceptions in promises,callbacks and async…await?
In async await, await pause the execution until awaited promise get the result. In prosimes we have states.

#### 8. How many arguments does setState take and why is it async.
Two arguments.

#### 9. List the steps needed to migrate a Class to Function Component.
I am unable to answer this question without using the internet.

#### 10. List a few ways styles can be used with components.
Styling with simple css classes, css modules, css in js, styled components and other libraries such as Tailwind, ChakraUI etc.

#### 11. How to render an HTML string coming from the server
Using dangerouslySetInnerHtml